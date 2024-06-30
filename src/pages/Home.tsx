import { ConnectModal, } from "@mysten/dapp-kit";
import { useState } from "react";
// import { Link } from "react-router-dom";
import backimg from '../assets/back.jpeg';
import SendSuiTx from "../components/SendSuiTx";
const Home = () => {
  const [open, setOpen] = useState(false);
  // const { connectionStatus } = useCurrentWallet();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };
  useEffect(() => {
    const savedPrincipal = localStorage.getItem('principal');
    if (savedPrincipal) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
      <ConnectModal
        trigger={""}
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
      />
      <div className="hero min-h-screen" style={{
        backgroundImage: `url(${backimg})`,
        backgroundPosition: 'center',
        backgroundSize: 'conver',
        filter: 'contrast(1.8)'
      }}>
        <div className=" "></div>
        <div className="hero-content text-center text-neutral-content ">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              <span className="text-white-700">Verif</span>
              <span className="text-accent">Ed</span>
            </h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>

            {
              isLoggedIn && <p>Connected</p>
            }

            
          </div>
        </div>
      </div>
      <SendSuiTx />

      {/* <VideoCapture /> */}
    </div>
  );
};

export default Home;
