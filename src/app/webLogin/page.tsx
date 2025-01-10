"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages

    const onLogIn = async () => {
        try {
            setLoading(true);
            setErrorMessage(""); // Clear previous errors

            const response = await axios.post("/api/users/login", user);
            const response2 = await axios.post("/api/users/handel", user);

            console.log(response, response2);

            // Force a reload to ensure the cookies are revalidated
            window.location.reload();
        } catch (error: any) {
            console.log("Login failed", error.response?.data?.error || error.message);
            setErrorMessage(error.response?.data?.error || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="relative flex min-h-screen">
            {/* Fire particles container */}
            <div className="fire-container">
                {[...Array(50)].map((_, i) => (
                    <div key={i} className="fire-particle" style={{ '--i': i } as React.CSSProperties}></div>
                ))}
            </div>

            {/* Right Side - Form */}
            <div className="w-full bg-inherit flex items-center justify-center relative z-10">
                <div className="w-full max-w-md p-8 border-2 border-primary py-36 px-24 rounded-xl">
                    <h1 className="text-4xl font-bold font-tertiary text-center mb-12 text-white">
                        {loading ? <LoadingSpinner /> : "Sign in"}
                    </h1>
                    {errorMessage && ( // Display error message if exists
                        <div className="bg-red-500 text-white text-center p-2 rounded mb-4">
                            {errorMessage}
                        </div>
                    )}
                    <label htmlFor="email" className="text-primary block text-sm font-medium text-gray-300">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
                        className="w-full p-2 mt-2 mb-4 border border-white bg-inherit rounded-lg focus:ring focus:ring-red-500 text-text"
                    />

                    <label htmlFor="password" className="text-primary block text-sm font-medium text-gray-300">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Password"
                        className="w-full p-2 mt-2 mb-4 border border-white bg-inherit rounded-lg focus:ring focus:ring-red-500 text-text"
                    />

                    <div className="mt-12">
                        <button
                            onClick={onLogIn}
                            disabled={buttonDisabled}
                            className="w-full bg-none py-2 font-bold hover:bg-secondary transition-colors duration-150 mb-4 text-white border-2 border-secondary rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Sign In
                        </button>

                        <div className="text-center">
                            <a href="/signup" className="text-secondary font-md text-sm hover:text-primary transition-all duration-150">Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LoadingSpinner() {
    return (
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-red-500 border-gray-300"></div>
    );
}
