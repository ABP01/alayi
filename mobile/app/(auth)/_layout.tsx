import { useAuth } from "@/contexts/AuthContext";
import { Redirect, Stack } from "expo-router";

const AuthLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) return <Redirect href={"/(tabs)"} />;

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
