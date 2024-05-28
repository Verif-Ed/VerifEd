import { ConnectButton, useWallet } from "@suiet/wallet-kit";
// 'use client' // for Next.js app router
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'

import "@suiet/wallet-kit/style.css";
import ThemeController from "./ThemeController";
import { useEffect } from "react";
import usewalletStore from "../store/walletStore";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { setWalletConnected } = usewalletStore();
  const wallet = useWallet();
  useEffect(() => {
    if (wallet.connected) {
      //  isWalletConnected= true;
      setWalletConnected(true);
      console.log("connected");
    } else {
      setWalletConnected(false);
      console.log("disconnected");
    }
  }, [wallet]);
  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("/api/verify", { // route to your backend will depend on implementation
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
    })
    if (!res.ok) {
        throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
};
const onSuccess = () => {
  // This is where you should perform any actions after the modal is closed
  // Such as redirecting the user to a new page
  window.location.href = "/dashboard";
};

  return (
    <div className="flex justify-center items- mt-2 fixed z-50 w-full ">
      <div className="border rounded-3xl  shadow-md shadow-gray-300 w-[85%] bg-base-200 ">
        <div className="navbar  rounded-3xl ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                  {/* <a>Dashboard</a> */}
                </li>
                <li>
                  <Link to="/leaderboard">LeaderBoard</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>
            <Link className=" font-bold ml-2 text-xl" to={"/"}>
              <span className="text-gray-700">Verif</span>
              <span className="text-accent">Ed</span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <li>
                <Link to="/leaderboard">LeaderBoard</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            {/* <a className="btn bg-blue-800">Connect Wallet</a> */}

            <IDKitWidget
              app_id="app_06dfaf6fb5f0b8ac58c10bf412238ffb" // obtained from the Developer Portal
              action="wallet-connect" // obtained from the Developer Portal
              onSuccess={onSuccess} // callback when the modal is closed
              handleVerify={handleVerify} // callback when the proof is received
              verification_level={VerificationLevel.Orb}
              
            >
              {({ open }) => 
                // This is the button that will open the IDKit modal
                <button onClick={open} className="w-[35%] bg-primary rounded-xl">Verify with World ID</button>
              }
              
            </IDKitWidget>
            <ConnectButton
              label="Connect Wallet"
              className="w-[100%] bg-primary"
              onConnectError={(wallet) => {
                console.log(wallet);
              }}
              onConnectSuccess={() => {
                console.log("connected");
              }}
              onDisconnectSuccess={() => {
                console.log("disconnected");
              }}
            />
          </div>
        </div>
      </div>
      <div className="border rounded-3xl  shadow-md shadow-gray-300 flex ml-2 px-2 py-1 bg-base-200">
        <ThemeController />
      </div>
    </div>
  );
};

export default Navbar;






