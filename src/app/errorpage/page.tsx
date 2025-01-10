import React from "react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-600">Account Not Verified</h1>
        <p className="text-center text-gray-700 mb-6">
          Please verify your account to access this page.
        </p>
        <hr className="mb-6" />
        <div className="text-center">
          <Link href="/webLogin">
          
              Go to Login
 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
