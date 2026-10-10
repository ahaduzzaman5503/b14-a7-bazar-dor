"use client";

import { authClient } from "../../../lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SigninPage = () => {
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const loadingToast = toast.loading("সাইন ইন হচ্ছে...");

    try {
      const { data: signInData, error } =
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

      if (error) {
        toast.error(
          error.message || "সাইন ইন ব্যর্থ হয়েছে",
          { id: loadingToast }
        );
        return;
      }

      if (signInData) {
        toast.success("সফলভাবে সাইন ইন হয়েছে!", {
          id: loadingToast,
          duration: 2000,
        });

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        id: loadingToast,
      });
    }
  };

  const handleGooglesignIn = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
      });

      if (error) {
        toast.error(error.message || "Google দিয়ে সাইন ইন ব্যর্থ হয়েছে");
      }
    } catch (error) {
      toast.error("Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে");
    }
  };

  const handleGithubsignIn = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
      });

      if (error) {
        toast.error(error.message || "GitHub দিয়ে সাইন ইন ব্যর্থ হয়েছে");
      }
    } catch (error) {
      toast.error("GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে");
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f8f4] px-4 py-7">
      <div className="mx-auto w-full max-w-[365px]">
        <div className="mb-6 text-center">
          <h1 className="text-[23px] font-bold text-[#202a23]">
            সাইন ইন
          </h1>

          <p className="mt-1 text-[12px] text-gray-500">
            স্বাগতম আবার, আপনার অ্যাকাউন্টে ঢুকুন এবং প্রোফাইল দেখুন।
          </p>
        </div>

        <div className="rounded-[15px] border border-[#dce5df] bg-white px-5 py-5 shadow-sm">
          <form onSubmit={handleSignIn} className="space-y-4">
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
                required
                placeholder="you@example.com"
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
                required
                placeholder="আপনার পাসওয়ার্ড দিন"
                className="h-[36px] w-full rounded-lg border border-[#dce4df] bg-white px-3 text-[12px] text-gray-700 outline-none placeholder:text-gray-500 focus:border-[#079447] focus:ring-1 focus:ring-[#079447]"
              />
            </div>

            <button
              type="submit"
              className="h-[37px] w-full rounded-lg bg-[#079447] text-[12px] font-medium text-white shadow-[0_2px_3px_rgba(0,0,0,0.2)] transition hover:bg-[#07833e] active:translate-y-[1px]"
            >
              সাইন ইন
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
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#079447] hover:underline"
            >
              সাইন আপ করুন
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

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 1000,
          style: {
            fontSize: "14px",
          },
          success: {
            style: {
              background: "#e8f8ee",
              color: "#079447",
            },
          },
          error: {
            style: {
              background: "#fff0f0",
              color: "#dc2626",
            },
          },
        }}
      />
    </main>
  );
};

export default SigninPage;
