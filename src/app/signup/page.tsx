"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const validateInput = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Ensures email ends with @gmail.com
    if (!emailRegex.test(user.email)) {
      setErrorMessage("Email must be a valid @gmail.com address.");
      return false;
    }
    if (user.password.length <= 4) {
      setErrorMessage("Password must be greater than 4 characters.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const onSignup = async () => {
    if (!validateInput()) return; // Prevent API call if validation fails

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);

      if (response.status === 200 && response.data.success) {
        console.log("Signup successful:", response.data);
        router.push("/verifycode"); // Navigate to the verify code page
      } else {
        console.error("Unexpected response:", response.data);
        alert("Signup failed. Please check your details and try again.");
      }
    } catch (error: any) {
      console.error("Signup error:", error?.response?.data || error.message);
      alert("An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="w-full max-w-6xl md:mr-24">
        <Card className="grid grid-flow-col overflow-hidden bg-inherit text-text">
          <div className="p-20">
            <CardHeader>
              <CardTitle className="font-tertiary text-4xl">Sign Up</CardTitle>
              <CardDescription className="font-secondary">Enter your sign-up details</CardDescription>
            </CardHeader>

            <CardContent>
              <form>
                <div className="grid gap-8 text-black [&_input]:active:outline-none [&_input]:text-text [&_label]:font-bold [&_label]:text-primary [&_input]:bg-inherit">
                  <div>
                    <Label>Username</Label>
                    <Input
                      onChange={(e) => setUser({ ...user, username: e.target.value })}
                      id="username"
                      value={user.username}
                      placeholder="Username"
                    />
                  </div>

                  <div>
                    <Label>E-mail</Label>
                    <Input
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      id="email"
                      value={user.email}
                      placeholder="E-mail"
                    />
                  </div>

                  <div>
                    <Label>Password</Label>
                    <Input
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                      id="password"
                      type="password"
                      value={user.password}
                      placeholder="Password"
                    />
                  </div>
                </div>
              </form>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
            </CardContent>

            <CardFooter className="container mx-auto gap-2 mt-4 grid">
              <Button
                onClick={onSignup}
                className="w-full font-bold hover:bg-secondary border-2 bg-inherit border-secondary"
                disabled={buttonDisabled || loading}
              >
                {loading ? <LoadingSpinner /> : "Sign Up"}
              </Button>
              <div>
                <Link href="/webLogin">
                  <h1 className="text-xs text-center text-gray-400 hover:text-gray-500">Already Have An Account?</h1>
                </Link>
              </div>
            </CardFooter>
          </div>

          <div className="hidden md:block h-full">
            <img
              src="/images/bmc.jpg"
              alt="Decorative"
              className="h-full object-center object-cover"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}

function LoadingSpinner() {
  return (
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-red-500 border-gray-300"></div>
  );
}
