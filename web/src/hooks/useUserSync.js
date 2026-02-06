import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../lib/axios";

function useUserSync() {
  const { isAuthenticated, getToken } = useAuth();

  const {
    mutate: syncUser,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      const token = getToken();
      if (!token) throw new Error("No token");

      const res = await api.post(
        "/auth/me", // We'll use GET /auth/me instead of POST /auth/callback
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (isAuthenticated && !isPending && !isSuccess) {
      syncUser();
    }
  }, [isAuthenticated, syncUser, isPending, isSuccess]);

  return { isSynced: isSuccess, isSyncing: isPending };
}
export default useUserSync;
