import { Navigate, Route, Routes } from "react-router";
import PageLoader from "./components/PageLoader";
import { useAuth } from "./contexts/AuthContext";
import useUserSync from "./hooks/useUserSync";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";

function App() {
  const { isAuthenticated, loading } = useAuth();
  useUserSync();

  if (loading) return <PageLoader />;

  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <HomePage /> : <Navigate to={"/chat"} />} />
      <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to={"/"} />} />
    </Routes>
  );
}

export default App;
