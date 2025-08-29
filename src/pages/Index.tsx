
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/30 to-primary/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
