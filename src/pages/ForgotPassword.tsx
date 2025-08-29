import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { GraduationCap, ArrowLeft, Mail, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate email sending
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/30 to-primary/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative w-full max-w-md space-y-6">
        {/* Header with icon and title */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center shadow-elegant">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            EduManage Pro
          </h1>
          <p className="text-muted-foreground">
            Password Recovery
          </p>
        </div>

        <Card className="shadow-elegant border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            {!isEmailSent ? (
              <>
                <CardTitle className="text-xl font-semibold text-center">Forgot Password?</CardTitle>
                <CardDescription className="text-center">
                  Enter your email address and we'll send you a link to reset your password
                </CardDescription>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-center">Email Sent!</CardTitle>
                <CardDescription className="text-center">
                  We've sent a password reset link to {email}
                </CardDescription>
              </>
            )}
          </CardHeader>
          
          <CardContent className="space-y-4">
            {!isEmailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 pl-10 bg-background/80 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Please check your email and click the link to reset your password.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                </div>
                
                <Button
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail("");
                  }}
                  variant="outline"
                  className="w-full h-11"
                >
                  Send Another Email
                </Button>
              </div>
            )}

            <div className="pt-4 border-t border-border/50">
              <Link to="/">
                <Button variant="ghost" className="w-full h-11 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Information */}
        <Card className="shadow-soft border-0 bg-secondary/30 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-foreground">Demo Mode</p>
              <p className="text-xs text-muted-foreground">
                In demo mode, password reset emails are simulated. Use the demo accounts on the login page to access the system.
              </p>
            </div>
          </CardContent>
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
    </div>
  );
};

export default ForgotPassword;