"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "Anonymous User",
    email: "user@example.com",
  });

  // Logout Handler
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");  // Log out API endpoint
      router.push("/webLogin");  // Redirect to login page
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // Fetch User Info
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("/api/fullinfo");  // Fetch user info from backend
      if (response.data.username) {
        setUser({
          username: response.data.username || "Anonymous User",
          email: response.data.email || "user@example.com",
        });
      } else {
        console.error("No user data received");
      }
    } catch (error: any) {
      console.log("Error fetching user info:", error.message);
    }
  };

  // Use Effect to Load User Info
  useEffect(() => {
    fetchUserInfo();  // Load user info when component mounts
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {/* User Image */}
        <div className="flex justify-center">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
          />
        </div>

        {/* User Information */}
        <div className="text-center mt-4">
          <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Username:</span>
            <span className="font-semibold text-gray-800">{user.username}</span>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
