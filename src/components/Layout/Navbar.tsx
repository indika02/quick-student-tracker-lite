
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden mr-2" 
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="text-xl font-bold text-primary">Student MS</div>
      </div>

      <div className="relative">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="hidden md:block text-right">
            <div className="font-medium">{currentUser?.fullName}</div>
            <div className="text-xs text-gray-500 capitalize">{currentUser?.role}</div>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
            {currentUser?.fullName.charAt(0)}
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
            <div className="px-4 py-2 md:hidden">
              <div className="font-medium">{currentUser?.fullName}</div>
              <div className="text-xs text-gray-500 capitalize">{currentUser?.role}</div>
            </div>
            <button 
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
