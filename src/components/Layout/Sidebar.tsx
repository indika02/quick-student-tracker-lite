
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Home, User, UserPlus, Settings, Calendar, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { label: "Students", path: "/students", icon: <User className="h-5 w-5" /> },
    { label: "Add Student", path: "/students/new", icon: <UserPlus className="h-5 w-5" /> },
    { label: "Courses", path: "/courses", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Attendance", path: "/attendance", icon: <Calendar className="h-5 w-5" /> },
  ];

  // Admin-only menu items
  const adminMenuItems = [
    { label: "Facilities", path: "/facilities", icon: <Settings className="h-5 w-5" /> },
  ];

  // Combine menu items based on user role
  const allMenuItems = isAdmin ? [...menuItems, ...adminMenuItems] : menuItems;

  return (
    <aside
      className={cn(
        "bg-secondary fixed left-0 top-0 z-30 h-full w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-5">
        <h1 className="text-2xl font-bold text-primary">SMS</h1>
        <p className="text-sm text-gray-500">Student Management System</p>
      </div>

      <nav className="mt-5">
        <ul>
          {allMenuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-5 py-3 transition-colors hover:bg-secondary-foreground/10",
                    isActive
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "text-gray-700"
                  )
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
