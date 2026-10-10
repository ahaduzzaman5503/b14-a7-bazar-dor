"use client";

import { authClient } from "../../lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Set the input's initial value from the current user
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    if (name.trim() === user?.name) {
      toast("কোনো পরিবর্তন করা হয়নি");
      return;
    }

    const loadingToast = toast.loading("প্রোফাইল আপডেট হচ্ছে...");
    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট ব্যর্থ হয়েছে", {
          id: loadingToast,
        });
        return;
      }

      toast.success("নাম সফলভাবে আপডেট হয়েছে!", {
        id: loadingToast,
      });
    } catch (error) {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        id: loadingToast,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    const loadingToast = toast.loading("সাইন আউট হচ্ছে...");
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট ব্যর্থ হয়েছে", {
          id: loadingToast,
        });
        setIsSigningOut(false);
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!", {
        id: loadingToast,
        duration: 1500,
      });

      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } catch (error) {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        id: loadingToast,
      });
      setIsSigningOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f8f4] px-4 py-5">
      <div className="mx-auto max-w-[520px]">
        <div className="mb-5">
          <h1 className="text-lg font-bold text-[#202a23]">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-lg text-[#7b827d]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </div>

        <div className="mb-4 rounded-[12px] border border-[#dce5df] bg-white px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-[50px] w-[50px] shrink-0 overflow-hidden rounded-full">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-gray-600">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-semibold text-[#202a23]">
                  {user?.name}
                </h2>

                <p className="mt-0.5 break-all text-sm text-[#6f7772]">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              type="button"
              disabled={isSigningOut}
              className="shrink-0 rounded-md border border-red-400 bg-white px-3 py-1.5 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60"
            >
              ↩ সাইন আউট
            </button>
          </div>
        </div>

        <div className="rounded-[12px] border border-[#dce5df] bg-white px-4 py-4">
          <h2 className="text-2xl font-semibold text-[#202a23]">
            তথ্য
          </h2>

          <form onSubmit={handleUpdate} className="mt-7">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block pl-1 text-sm font-medium text-[#303530]"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-10 w-full rounded-md border border-[#dce4df] bg-white px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#079447] focus:ring-1 focus:ring-[#079447]"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating || isSigningOut}
              className="mt-3 h-10 w-full rounded-md bg-[#079447] text-sm font-medium text-white shadow-[0_2px_3px_rgba(0,0,0,0.2)] transition hover:bg-[#07833e] active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </button>
          </form>
        </div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
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

export default ProfilePage;
