import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Callback from "./pages/Callback";
import Onboarding from "./pages/Onboarding";
import Practice from "./pages/Practice";
import MyPet from "./pages/MyPet";

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/pet" element={<MyPet />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navigate to="/onboarding" replace />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ToastProvider>
  );
}
