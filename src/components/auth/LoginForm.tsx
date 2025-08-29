
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GraduationCap, Users, BookOpen } from "lucide-react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      setIsLoading(false);
      // Navigation is handled by the Index component based on user role
    }, 800); // Simulate network delay
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Header with icon and title */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center shadow-elegant">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          EduManage Pro
        </h1>
        <p className="text-muted-foreground">
          Comprehensive Student Management System
        </p>
      </div>

      <Card className="shadow-elegant border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl font-semibold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 bg-background/80 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 bg-background/80 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>
              <Button variant="link" className="px-0 text-primary text-sm">
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4 pt-4 border-t border-border/50">
          <div className="text-center space-y-3">
            <p className="text-sm font-medium text-foreground">Demo Accounts</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex flex-col items-center p-2 rounded-lg bg-secondary/50">
                <Users className="w-4 h-4 text-primary mb-1" />
                <span className="font-medium">Admin</span>
                <span className="text-muted-foreground">admin / password</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-secondary/50">
                <BookOpen className="w-4 h-4 text-primary mb-1" />
                <span className="font-medium">Teacher</span>
                <span className="text-muted-foreground">teacher / password</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-secondary/50">
                <GraduationCap className="w-4 h-4 text-primary mb-1" />
                <span className="font-medium">Student</span>
                <span className="text-muted-foreground">student / student123</span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Footer */}
      <footer className="text-center space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center justify-center space-x-4">
          <span>© 2024 EduManage Pro</span>
          <span>•</span>
          <Button variant="link" className="px-0 py-0 h-auto text-xs text-muted-foreground">
            Privacy Policy
          </Button>
          <span>•</span>
          <Button variant="link" className="px-0 py-0 h-auto text-xs text-muted-foreground">
            Terms of Service
          </Button>
        </div>
        <p>Empowering education through technology</p>
      </footer>
    </div>
  );
};

export default LoginForm;
