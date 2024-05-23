"use client";
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function VerifyEmail() {
  // const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      axios.post("api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setError(false);
    // first way
    // const { query } = router;
    // const urlToken = query.token;

    // 2nd way
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        {verified ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-500">
              Email Verified!
            </h1>
            <p className="mt-4">Thank you for verifying your email address.</p>
            <Link href="/login" className="text-2xl font-bold text-green-500">
              Login
            </Link>
            {/* Display token for development */}
            <h2 className="text-xl font-bold text-gray-600 mt-4">
              Token: {token}
            </h2>
          </div>
        ) : error ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500">
              Verification Failed
            </h1>
            <p className="mt-4">
              There was an error verifying your email. Please try again.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-500">
              Verifying Email...
            </h1>
            <p className="mt-4">
              Please wait while we verify your email address.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
