
import { useAuthStore } from "../store/useAuthStore"; // If you need user info
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react"; // Optional for logout button

const TopBar = () => {
  const { authUser } = useAuthStore(); // Assuming this gives you the logged-in user's data

  return (
    <header className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-xl font-bold">
          <span className="text-2xl">ChatApp</span> {/* Use your logo name or style here */}
        </Link>
        {/* You can add icons here or modify this based on login page design */}
      </div>

      <div className="flex items-center gap-3">
        {/* User profile */}
        <div className="flex items-center gap-2">
          <img
            src={authUser?.profilePic || "/avatar.png"}
            alt="User Avatar"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <span>{authUser?.name}</span>
        </div>

        {/* Optional: Logout Button */}
        <button
          onClick={() => {
            // Handle logout logic here
            console.log("Logged out!");
          }}
          className="btn btn-outline btn-sm text-white"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
