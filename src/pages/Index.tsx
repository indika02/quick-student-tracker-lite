
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { isAuthenticated } = useAuth();

  const { currentUser } = useAuth();

  if (isAuthenticated) {
    if (currentUser?.role === 'student') {
      return <Navigate to="/student-dashboard" />;
    }
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
