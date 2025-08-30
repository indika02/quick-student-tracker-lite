
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import loginHero from "@/assets/login-hero.jpg";

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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${loginHero})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/90"></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Content */}
      <div className="relative w-full max-w-md z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
