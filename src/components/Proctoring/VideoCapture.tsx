import React, { useContext, useEffect, useRef } from "react";
// import io from "socket.io-client";
import * as faceMesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import * as drawingUtils from "@mediapipe/drawing_utils";
import {
  analyzeTexture,
  detectBlink,
  detectDepthVariation,
  detectHeadMovement,
} from "../../utils/livenessDetector";
import SocketContext from "../../Context/SocketContext";

const VideoCapture: React.FC = () => {
  const { socket } = useContext(SocketContext);
  console.log(socket, "this is socket");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<faceMesh.Results | null>(null);

  useEffect(() => {
    const faceMeshInstance = new faceMesh.FaceMesh({
      locateFile: (file: any) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMeshInstance.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMeshInstance.onResults((results: any) => {
      resultsRef.current = results;
      drawResults();
      analyzeResults();
    });

    if (videoRef.current) {
      const camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await faceMeshInstance.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    const intervalId = setInterval(() => {
      promptUserAction();
    }, 30000); // Every 30 seconds

    return () => {
      faceMeshInstance.close();
      clearInterval(intervalId);
    };
  }, []);

  const drawResults = () => {
    if (canvasRef.current && resultsRef.current) {
      const canvasCtx = canvasRef.current.getContext("2d");
      if (canvasCtx) {
        canvasCtx.save();
        canvasCtx.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        canvasCtx.drawImage(
          resultsRef.current.image,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        if (resultsRef.current.multiFaceLandmarks) {
          for (const landmarks of resultsRef.current.multiFaceLandmarks) {
            drawingUtils.drawConnectors(
              canvasCtx,
              landmarks,
              faceMesh.FACEMESH_TESSELATION,
              { color: "#C0C0C070", lineWidth: 1 }
            );
          }
        }
        canvasCtx.restore();
      }
    }
  };

  const analyzeResults = () => {
    if (resultsRef.current && resultsRef.current.multiFaceLandmarks) {
      const landmarks = resultsRef.current.multiFaceLandmarks[0];
      if (landmarks) {
        const blinked = detectBlink(landmarks);
        const headMoved = detectHeadMovement(landmarks);
        const hasDepth = detectDepthVariation(landmarks);

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
          const imageData = ctx?.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const hasNaturalTexture = imageData
            ? analyzeTexture(imageData)
            : false;

          if (blinked || headMoved || hasDepth || hasNaturalTexture) {
            // console.log("Likely a real person");
          } else {
            console.log("Possible photo detected");
            socket.emit("proctoring_alert", { type: "possible_photo" });
          }
        }

        const leftEye = landmarks[33];
        const rightEye = landmarks[263];
        const nose = landmarks[1];

        const lookingAway = isLookingAway(leftEye, rightEye, nose);

        if (lookingAway) {
          console.log("User might be looking away");
          socket.emit("proctoring_alert", { type: "looking_away" });
        }

        if (resultsRef.current.multiFaceLandmarks.length > 1) {
          console.log("Multiple faces detected");
          socket.emit("proctoring_alert", { type: "multiple_faces" });
        }
      } else {
        console.log("No face detected");
        socket.emit("proctoring_alert", { type: "no_face" });
      }
    }
  };

  const isLookingAway = (
    leftEye: faceMesh.NormalizedLandmark,
    rightEye: faceMesh.NormalizedLandmark,
    nose: faceMesh.NormalizedLandmark
  ) => {
    const eyeDistance = Math.sqrt(
      Math.pow(rightEye.x - leftEye.x, 2) + Math.pow(rightEye.y - leftEye.y, 2)
    );
    const noseOffset = Math.abs((leftEye.x + rightEye.x) / 2 - nose.x);
    return noseOffset > eyeDistance * 0.5;
  };

  const promptUserAction = () => {
    const randomAction = Math.random() < 0.5 ? "blink" : "head_move";
    // alert(`Please : ${randomAction}`);
    socket.emit("proctoring_challenge", { action: randomAction });
    console.log(`Prompt user to: ${randomAction}`);
  };

  return (
    <div className="">
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas
        ref={canvasRef}
        width="100"
        height="90"
        className="rounded-full"
      />
    </div>
  );
};

export default VideoCapture;
