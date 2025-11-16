

import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore"; // Import useThemeStore

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { theme } = useThemeStore(); // Get the current theme from the store

  // Dynamically apply theme-related classes to the container
  return (
    <div className={`min-h-screen bg-gradient-to-r from-${theme.primary} to-${theme.secondary}`}>
      <div className="flex items-center justify-center pt-12 px-4">
        <div
          className={`bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-6rem)] bg-${theme.background}`}
        >
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Sidebar */}
            <div
              className={`w-1/4 bg-${theme.sidebarBg} rounded-l-lg shadow-md p-4`}
            >
              <Sidebar />
            </div>

            {/* Chat Area */}
            <div
              className={`w-3/4 flex flex-col bg-${theme.chatBg} rounded-r-lg shadow-md p-4`}
            >
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
