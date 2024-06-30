import * as faceMesh from "@mediapipe/face_mesh";

const blinkThreshold = 0.3;
let lastBlinkTime = 0;

export const detectBlink = (landmarks: faceMesh.NormalizedLandmark[]) => {
  const leftEyeUpper = landmarks[159];
  const leftEyeLower = landmarks[145];
  const rightEyeUpper = landmarks[386];
  const rightEyeLower = landmarks[374];

  const leftEyeDistance = Math.abs(leftEyeUpper.y - leftEyeLower.y);
  const rightEyeDistance = Math.abs(rightEyeUpper.y - rightEyeLower.y);

  if (leftEyeDistance < blinkThreshold && rightEyeDistance < blinkThreshold) {
    const now = Date.now();
    if (now - lastBlinkTime > 1000) {
      // Avoid counting multiple frames of the same blink
      lastBlinkTime = now;
      return true;
    }
  }
  return false;
};

let lastNosePosition: { x: number; y: number } | null = null;

export const detectHeadMovement = (
  landmarks: faceMesh.NormalizedLandmark[]
) => {
  const nose = landmarks[1];
  if (lastNosePosition) {
    const movement = Math.sqrt(
      Math.pow(nose.x - lastNosePosition.x, 2) +
        Math.pow(nose.y - lastNosePosition.y, 2)
    );
    lastNosePosition = { x: nose.x, y: nose.y };
    return movement > 0.001 && movement < 0.1; // Threshold for natural movement
  }
  lastNosePosition = { x: nose.x, y: nose.y };
  return false;
};

export const detectDepthVariation = (
  landmarks: faceMesh.NormalizedLandmark[]
) => {
  const nose = landmarks[1];
  const leftCheek = landmarks[234];
  const rightCheek = landmarks[454];

  const depthVariation = Math.abs(nose.z - (leftCheek.z + rightCheek.z) / 2);
  return depthVariation > 0.01; // Adjust threshold as needed
};

export const analyzeTexture = (imageData: ImageData) => {
  // This is a placeholder for a more complex texture analysis
  // You might want to use a pre-trained model for this
  // or implement more sophisticated image processing techniques
  const data = imageData.data;
  let sum = 0;
  for (let i = 0; i < data.length; i += 4) {
    sum += Math.abs(data[i] - data[i + 4]);
  }
  return sum / (data.length / 4) > 10; // Adjust threshold as needed
};
