import { ConnectModal, useCurrentWallet } from "@mysten/dapp-kit";
import { useState } from "react";
import { Link } from "react-router-dom";
import SendSuiTx from "../components/SendSuiTx";
// import VideoCapture from "../components/Proctoring/VideoCapture";
const Home = () => {
  const [open, setOpen] = useState(false);
  const { connectionStatus } = useCurrentWallet();
  return (
    <div>
      <ConnectModal
        trigger={""}
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
      />
      <div className="hero min-h-screen">
        <div className=" "></div>
        <div className="hero-content text-center text-neutral-content ">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              <span className="text-gray-700">Verif</span>
              <span className="text-accent">Ed</span>
            </h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>

            {connectionStatus === "connected" ? (
              <div>
                <button className="btn btn-primary">
                  <Link to={"/dashboard"}>Explore</Link>
                </button>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
      <SendSuiTx />

      {/* <VideoCapture /> */}
    </div>
  );
};

export default Home;
