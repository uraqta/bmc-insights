import React from 'react';

const SignupConfirmation: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center max-w-lg p-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Thank you for signing up!</h1>
        <p className="text-lg mb-6">
          Please check your email to verify your account and complete your registration.
        </p>
        <p className="text-lg">
          Once verified, you can log in and access your account.
        </p>
      </div>
    </div>
  );
};

export default SignupConfirmation;
