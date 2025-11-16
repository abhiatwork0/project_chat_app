
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen bg-base-200 container mx-auto px-4 pt-16 sm:px-6 md:px-8">
      <div className="max-w-3xl mx-auto bg-base-100 p-8 rounded-lg shadow-xl space-y-8">
        
        {/* Theme Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-base-content">Choose Your Theme</h2>
          <p className="text-sm text-base-content/70">Customize your chat interface appearance by selecting a theme.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-2 p-4 rounded-xl transition-colors
                ${theme === t ? "bg-base-300 shadow-lg" : "hover:bg-base-200"} hover:scale-105`}
              onClick={() => setTheme(t)}
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden relative bg-neutral">
                <div className="absolute inset-0 grid grid-cols-2 gap-px p-1">
                  <div className={`w-full h-full bg-primary`} />
                  <div className={`w-full h-full bg-accent`} />
                </div>
              </div>
              <span className="text-sm font-semibold text-center">{t.charAt(0).toUpperCase() + t.slice(1)}</span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <div>
          <h3 className="text-xl font-semibold text-base-content mb-4">Chat Preview</h3>
          <div className="bg-base-100 border border-base-300 rounded-xl overflow-hidden shadow-md">
            <div className="p-4 bg-base-200">
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-base-100 font-medium">
                    JD
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">John Doe</h3>
                    <p className="text-xs text-base-content/60">Online</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-3 shadow-md
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1.5 ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}`}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10 rounded-md"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0 rounded-md p-2">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default SettingsPage;
