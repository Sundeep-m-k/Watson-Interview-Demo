import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-primary border-b border-primary-foreground/10 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
            <GraduationCap className="h-8 w-8" />
            <span className="font-bold text-lg hidden sm:inline">Watson Portal</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-1">
            <Link
              to="/"
              className={cn(
                "px-4 py-2 rounded-md font-medium transition-colors",
                location.pathname === "/"
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className={cn(
                "px-4 py-2 rounded-md font-medium transition-colors",
                location.pathname === "/projects"
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
