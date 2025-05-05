
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { mockUsers, User } from "../utils/mockData";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Check if user is already logged in (from session storage)
  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.fullName}!`,
      });
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem("currentUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isAuthenticated: !!currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
