

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB");
      return;
    }

    setLoading(true);
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      try {
        await updateProfile({ profilePic: base64Image });
        toast.success("Profile picture updated successfully!");
      } catch (error) {
        toast.error("Failed to update profile picture.");
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="h-screen pt-20 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="max-w-3xl mx-auto p-6 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8 border border-gray-300">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-800">Profile</h1>
            <p className="mt-2 text-gray-500">Manage your personal information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-md transition-all duration-300 group-hover:scale-105"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full cursor-pointer transition-all duration-200 shadow-lg ${
                  isUpdatingProfile ? "pointer-events-none opacity-60" : ""
                }`}
              >
                <Camera className="w-6 h-6 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile || loading}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              {loading ? "Uploading..." : isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600" />
                <span>Full Name</span>
              </div>
              <p className="px-4 py-2.5 bg-gray-100 rounded-lg border text-gray-700">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-600" />
                <span>Email Address</span>
              </div>
              <p className="px-4 py-2.5 bg-gray-100 rounded-lg border text-gray-700">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-8 bg-gray-100 rounded-xl p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-300">
                <span className="text-gray-600">Member Since</span>
                <span className="text-gray-600">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Account Status</span>
                <span className="text-green-500 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
