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

      const res = await api.get(
        "/auth/me",
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
  }, [isAuthenticated, isPending, isSuccess]);

  return { isSynced: isSuccess, isSyncing: isPending };
}
export default useUserSync;
