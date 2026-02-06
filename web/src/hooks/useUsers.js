import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import api from "../lib/axios";

export const useUsers = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error("No token");

      const res = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!getToken(), // Only run if we have a token
  });
};
