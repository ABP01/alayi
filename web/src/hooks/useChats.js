import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import api from "../lib/axios";

export const useChats = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error("No token");

      const res = await api.get("/chats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!getToken(),
  });
};

export const useGetOrCreateChat = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (participantId) => {
      const token = getToken();
      if (!token) throw new Error("No token");

      const res = await api.post(
        `/chats/with/${participantId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chats"] }),
  });
};
