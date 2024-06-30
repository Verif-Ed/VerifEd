import { ConnectButton, useCurrentWallet } from "@mysten/dapp-kit";
import { useEffect } from "react";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/idkit";
import "@suiet/wallet-kit/style.css";
import ThemeController from "./ThemeController";
import usewalletStore from "../store/walletStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setWalletConnected } = usewalletStore();
  const { connectionStatus } = useCurrentWallet();

  useEffect(() => {
    if (connectionStatus === "connected") {
      setWalletConnected(true);
      console.log("connected");
    } else {
      setWalletConnected(false);
      console.log("disconnected");
    }
  }, [connectionStatus]);

  const handleVerify = async (proof: ISuccessResult) => {
    console.log("handling proof", proof);

    const res = await fetch("http://localhost:3000/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });
    if (!res.ok) {
      throw new Error("Verification failed."); 
    }
  };

  const onSuccess = () => {
    console.log("success connected to worldcoin id");
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex justify-center items- mt-2 fixed z-50 w-full ">
      <div className="w-[85%]  bg-opacity-60 backdrop-blur-sm rounded-lg ">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-white"
              >
                <li>
                  <Link to="/dashboard" className="text-white">Dashboard</Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="text-white">LeaderBoard</Link>
                </li>
                <li>
                  <Link to="/about" className="text-white">About</Link>
                </li>
              </ul>
            </div>
            <Link className="font-bold ml-2 text-xl" to={"/"}>
              <span className="text-gray-700">Verif</span>
              <span className="text-accent">Ed</span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-2">
              <li>
                <Link to="/dashboard" className="text-white text-lg font-bold">Dashboard</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-white text-lg font-bold">LeaderBoard</Link>
              </li>
              <li>
                <Link to="/about" className="text-white text-lg font-bold">About</Link>
              </li>
            </ul>
            <ThemeController />
          </div>
          <div className="navbar-end">
            <IDKitWidget
              app_id="app_06dfaf6fb5f0b8ac58c10bf412238ffb"
              action="wallet-connect"
              onSuccess={onSuccess}
              handleVerify={handleVerify}
              verification_level={VerificationLevel.Device}
            />
            <div>
              <ConnectButton
                connectText={"Connect Wallet"}
                style={{ backgroundColor: "" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex ml-2 px-1">
        
      </div>
    </div>
  );
};

export default Navbar;
