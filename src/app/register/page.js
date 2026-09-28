"use client";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { redirect } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email, // user email address
      password: user.password, // user password -> min 8 characters by default
      name: user.name, // user display name
      image: user.image, // User image URL (optional)
      callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
    });

    if (!error) {
      redirect("/login");
    } else {
      setErrorMessage(
        <>
          User Already Exist, Please{" "}
          <a href="/login" className="underline">
            Sign In
          </a>
        </>,
      );
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
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          <section className="max-w-xl pt-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#ed1d26]">
              Welcome to DriveFleet
            </p>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-[#fefefe] sm:text-5xl lg:text-6xl">
              Your Journey
              <span className="block text-[#ed1d26]">Starts Here.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 dark:text-white/60 sm:text-lg">
              Create your DriveFleet account and enjoy a simple and convenient
              car rental experience. Find your perfect car, make a booking, and
              get ready for your next journey.
            </p>
          </section>

          <section className="w-full">
            <div className="mx-auto w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10 dark:border-white/10 dark:bg-[#0d0915]">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-[#fefefe]">
                  Create Your Account
                </h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-white/50">
                  Register to start renting your perfect car.
                </p>
              </div>

              <Form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-5"
              >
                <TextField name="name" isRequired>
                  <Label>Name</Label>

                  <Input
                    type="text"
                    placeholder="Enter your name"
                    className="rounded-2xl"
                  />

                  <FieldError />
                </TextField>

                <TextField
                  name="email"
                  type="email"
                  isRequired
                  validate={(value) => {
                    if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ) {
                      return "Please enter a valid email address";
                    }

                    return null;
                  }}
                >
                  <Label>Email</Label>

                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-2xl"
                  />

                  <FieldError />
                </TextField>

                <TextField name="image" type="url" isRequired>
                  <Label>Photo URL</Label>

                  <Input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    className="rounded-2xl"
                  />

                  <FieldError />

                  <p className="mt-2 text-xs text-gray-500 dark:text-white/40">
                    Add a direct URL to your profile photo.
                  </p>
                </TextField>

                <TextField
                  name="password"
                  type="password"
                  isRequired
                  minLength={8}
                  validate={(value) => {
                    if (value.length < 8) {
                      return "Password must be at least 8 characters";
                    }

                    if (!/[A-Z]/.test(value)) {
                      return "Password must contain at least one uppercase letter";
                    }

                    if (!/[0-9]/.test(value)) {
                      return "Password must contain at least one number";
                    }

                    return null;
                  }}
                >
                  <Label>Password</Label>

                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="rounded-2xl"
                  />

                  <p className="mt-2 text-xs text-gray-500 dark:text-white/40">
                    Must be at least 8 characters with 1 uppercase letter and 1
                    number.
                  </p>

                  <FieldError />
                </TextField>
                {errorMessage && (
                  <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
                )}
                <Button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-[#ed1d26] py-6 text-base font-semibold text-[#fefefe] transition hover:bg-[#c9151d]"
                >
                  Register
                </Button>
              </Form>

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
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#ed1d26] transition hover:text-[#c9151d]"
                >
                  Login
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
