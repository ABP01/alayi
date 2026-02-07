import { useAuth } from "@/contexts/AuthContext";
import * as Sentry from "@sentry/react-native";
import { useEffect, useRef } from "react";

const AuthSync = () => {
  const { user, isAuthenticated } = useAuth();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (isAuthenticated && user && !hasSynced.current) {
      hasSynced.current = true;
      console.log("✅ User authenticated:", user.name);
      Sentry.logger.info(Sentry.logger.fmt`User authenticated: ${user.name}`, {
        userId: user.id,
        userName: user.name,
      });
    }

    if (!isAuthenticated) {
      hasSynced.current = false;
    }
  }, [isAuthenticated, user]);

  return null;
};

export default AuthSync;
