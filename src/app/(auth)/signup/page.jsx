"use client";

import { authClient } from "../../../lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SignupPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { data: signUpData, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    if (error) {
      console.error("Signup error:", error);
      toast.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }

    if (signUpData) {
      toast("Registration Successful");

      setTimeout(() => {
        redirect("/signin");
      }, 2000);
    }
  };

  const handleGooglesignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleGithubsignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <main className="min-h-screen bg-[#f3f8f4] px-4 py-5">
      <div className="mx-auto w-full max-w-[400px]">
        <div className="mb-5 text-center">
          <h1 className="text-[22px] font-bold text-[#202a23]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-1 text-[12px] text-gray-500">
            বিনামূল্যে সাইন আপ করে সব সুবিধাগুলো চালু করুন
          </p>
        </div>

        <div className="rounded-[15px] border border-[#dce5df] bg-white px-5 py-5 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-[13px] font-medium text-[#202a23]"
              >
                নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="name"
                required
                className="h-[36px] w-full rounded-lg border border-[#dce4df] bg-white px-3 text-[12px] text-gray-700 outline-none placeholder:text-gray-500 focus:border-[#079447] focus:ring-1 focus:ring-[#079447]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[13px] font-medium text-[#202a23]"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="h-[36px] w-full rounded-lg border border-[#dce4df] bg-white px-3 text-[12px] text-gray-700 outline-none placeholder:text-gray-500 focus:border-[#079447] focus:ring-1 focus:ring-[#079447]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-[13px] font-medium text-[#202a23]"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
                className="h-[36px] w-full rounded-lg border border-[#dce4df] bg-white px-3 text-[12px] text-gray-700 outline-none placeholder:text-gray-500 focus:border-[#079447] focus:ring-1 focus:ring-[#079447]"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-[13px] font-medium text-[#202a23]"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="আবার লিখুন"
                required
                className="h-[36px] w-full rounded-lg border border-[#dce4df] bg-white px-3 text-[12px] text-gray-700 outline-none placeholder:text-gray-500 focus:border-[#079447] focus:ring-1 focus:ring-[#079447]"
              />
            </div>

            <button
              type="submit"
              className="mt-0.5 h-[37px] w-full rounded-lg bg-[#079447] text-[12px] font-medium text-white shadow-[0_2px_3px_rgba(0,0,0,0.2)] transition hover:bg-[#07833e] active:translate-y-[1px]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#dfe5e1]" />

            <span className="text-[11px] text-gray-500">অথবা</span>

            <div className="h-px flex-1 bg-[#dfe5e1]" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleGooglesignIn}
              type="button"
              className="flex h-[36px] items-center justify-center gap-1.5 rounded-lg border border-[#dce4df] bg-white text-[11px] font-medium text-[#303530] transition hover:bg-black hover:text-white"
            >
              <FaGoogle className="text-[13px]" />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              onClick={handleGithubsignIn}
              type="button"
              className="flex h-[36px] items-center justify-center gap-1.5 rounded-lg border border-[#dce4df] bg-white text-[11px] font-medium text-[#303530] transition hover:bg-black hover:text-white"
            >
              <FaGithub className="text-[14px]" />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="mt-4 text-center text-[11px] text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-medium text-[#079447] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-[11px] text-gray-400 transition hover:text-gray-600"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
      <Toaster />
    </main>
  );
};

export default SignupPage;
