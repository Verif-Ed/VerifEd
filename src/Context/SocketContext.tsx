import { useState, createContext, useEffect } from "react";
import { Socket, io } from "socket.io-client";

const SocketContext = createContext<any>(undefined);

export const SocketProvider = ({ children }: { children: any }) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (socket == null) {
      const socket = io("http://localhost:3000", {});
      setSocket(socket);
    }
    // console.log("socet connected");

    if (socket) {
    }
    // console.log(usertrips.trips);
  }, []);

  return (
    <>
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    </>
  );
};

export default SocketContext;
