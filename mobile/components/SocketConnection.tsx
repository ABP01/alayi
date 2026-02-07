import { useAuth } from "@/contexts/AuthContext";
import { useSocketStore } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const SocketConnection = () => {
  const { getToken, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const connect = useSocketStore((state) => state.connect);
  const disconnect = useSocketStore((state) => state.disconnect);

  useEffect(() => {
    if (isAuthenticated) {
      const token = getToken();
      if (token) connect(token, queryClient);
    } else disconnect();

    return () => {
      disconnect();
    };
  }, [isAuthenticated, connect, disconnect, getToken, queryClient]);

  return null;
};

export default SocketConnection;
