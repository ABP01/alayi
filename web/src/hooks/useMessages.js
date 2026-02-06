import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import api from "../lib/axios";

export const useMessages = (chatId) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error("No token");

      const res = await api.get(`/messages/chat/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!chatId && !!getToken(),
  });
};
