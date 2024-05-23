"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup successful", response.data);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else setButtonDisabled(true);
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 to-orange-400">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">
          {buttonDisabled ? "Please fill the form" : "Signup"}
        </h1>
        <div className="flex flex-col space-y-4 text-black">
          <input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="input border rounded p-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="input border rounded p-1"
          />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="input border rounded p-1"
          />
          <button
            onClick={onSignup}
            disabled={buttonDisabled || loading}
            className={`button ${
              loading ? "opacity-70" : ""
            } bg-blue-500 rounded text-white p-4`}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </div>
        <div className="mt-4 text-blue-500 text-center">
          <Link href="/login">Go to Login page...</Link>
        </div>
      </div>
    </div>
  );
}

/* styles will be in your Tailwind CSS configuration (tailwind.config.js) */
