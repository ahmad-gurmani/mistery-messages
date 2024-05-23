"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface UserData {
  username: string;
  email: string;
  _id: string;
  // Add more fields as needed
}

function Profile() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post("/api/users/profile");
        console.log(response, "res");
        toast.success(response.data.message);
        setUserData(response.data.data);

        setFetching(false);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to fetch profile data.");
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      router.push("/login");
    } catch (error: any) {
      console.error("Failed to logout:", error);
      setLoading(false);
      toast.error("Failed to logout.");
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-8 rounded-lg text-black shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        {userData && (
          <div className="mb-4">
            <p className="text-lg">Name: {userData.username}</p>
            <p className="text-lg">Email: {userData.email}</p>
            <Link
              href={`/profile/${userData._id}`}
              className="w-1/2 m-auto text-nowrap mt-2 py-2 px-4 bg-blue-600 text-white rounded flex justify-center hover:bg-blue-700 transition duration-200"
            >
              {loading ? "loading..." : "Go to user details"}
            </Link>
          </div>
        )}
        <button
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Profile;
