import { ConnectButton } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
const Navbar = () => {
  return (
    <div className="flex justify-center items- mt-2">
      <div className="border rounded-3xl border-gray-300 shadow-md shadow-gray-300 w-[90%] ">
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
                  <a>Dashboard</a>
                </li>
                <li>
                  <a>LeaderBoard</a>
                </li>
                <li>
                  <a>About</a>
                </li>
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">VerifEd</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="./Dashboard">Dashboard</a>
              </li>

              <li>
                <a href="./">LeaderBoard</a>
              </li>
              <li>
                <a href="./">About</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            {/* <a className="btn bg-blue-800">Connect Wallet</a> */}
            <ConnectButton className="bg-blue-950"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
