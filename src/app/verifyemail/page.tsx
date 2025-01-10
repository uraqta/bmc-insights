"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post('/api/users/verifyemail', { token });
      if (response.data.success) {
        setVerified(true);
      } else {
        setError(response.data.error || "Unknown error");
      }
    } catch (err: any) {
      console.error("Error during email verification:", err);
      setError("An error occurred while verifying email");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError("No token found in URL");
    }
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      <h2>{token ? `Token: ${token}` : "No token provided"}</h2>
      {verified && (
        <>
          <h2 className="text-black">Email successfully verified!</h2>
          <a href="/webLogin">Login</a>
        </>
      )}
      {error && (
        <h2 className="text-black">Error: {error}</h2>
      )}
    </div>
  );
}
