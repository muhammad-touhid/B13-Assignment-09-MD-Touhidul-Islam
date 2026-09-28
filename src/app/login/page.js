"use client";

import { Button, Form, Input, Label, TextField } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email, // user email address
      password: user.password, // user password -> min 8 characters by default
      callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
    });
    if (!error) {
      router.push("/");
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-[#07030e]">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <section className="max-w-xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#ed1d26]">
              Welcome Back
            </p>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-[#fefefe] sm:text-5xl lg:text-6xl">
              Ready for Your
              <span className="block text-[#ed1d26]">Next Journey?</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 dark:text-white/60 sm:text-lg">
              Sign in to your DriveFleet account and continue your journey.
              Manage your bookings, explore available cars, and get back on the
              road with ease.
            </p>
          </section>

          <section className="w-full">
            <div className="mx-auto w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10 dark:border-white/10 dark:bg-[#0d0915]">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-[#fefefe]">
                  Welcome Back
                </h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-white/50">
                  Sign in to your GoDrive account.
                </p>
              </div>

              <Form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-5"
              >
                <TextField name="email" type="email" isRequired>
                  <Label>Email</Label>

                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-2xl"
                  />
                </TextField>

                {/* Password */}
                <TextField name="password" type="password" isRequired>
                  <Label>Password</Label>

                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="rounded-2xl"
                  />
                </TextField>
                {errorMessage && (
                  <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
                )}
                <Button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-[#ed1d26] py-6 text-base font-semibold text-[#fefefe] transition hover:bg-[#c9151d]"
                >
                  Login
                </Button>
              </Form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />

                <span className="text-xs font-medium text-gray-400">OR</span>

                <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
              </div>

              <Button
                type="button"
                onPress={handleGoogleLogin}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-6 text-base font-medium text-gray-700 transition hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-[#fefefe] dark:hover:bg-white/10"
              >
                <FcGoogle size={21} />
                Continue with Google
              </Button>

              <p className="mt-7 text-center text-sm text-gray-500 dark:text-white/50">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[#ed1d26] transition hover:text-[#c9151d]"
                >
                  Register
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
