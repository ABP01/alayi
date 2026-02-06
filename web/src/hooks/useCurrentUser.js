import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import api from "../lib/axios";

export const useCurrentUser = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error("No token");

      const { data } = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    enabled: !!getToken(), // Only run if we have a token
  });
};
