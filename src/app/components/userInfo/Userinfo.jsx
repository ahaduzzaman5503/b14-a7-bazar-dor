"use client";

import Image from "next/image";
import { authClient } from "../../../lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Userinfo = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    const loadingToast = toast.loading("সাইন আউট হচ্ছে...");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট ব্যর্থ হয়েছে", {
          id: loadingToast,
        });
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
    }
  };

  return (
    <div className="flex gap-4">
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-100"
          >
            <div className="h-9 w-9 overflow-hidden rounded-full">
              {user.image ? (
                <Image
                  src={user.image}
                  alt="User"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            <span className="text-sm font-medium text-gray-800">
              {user.name}
            </span>

            <span className="text-xs text-gray-500">⌄</span>
          </div>

          <div
            tabIndex={0}
            className="dropdown-content z-50 mt-3 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
          >
            <div className="border-b border-gray-100 pb-3">
              <p className="text-sm font-semibold text-gray-800">
                {user.name}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {user.email}
              </p>
            </div>

            <Link
              href="/myProfile"
              className="flex w-full items-center gap-2 rounded-lg px-2 py-3 text-sm text-gray-700 hover:bg-green-200"
            >
              <span>👤</span>
              <span>আমার প্রোফাইল</span>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-red-200"
            >
              <span>↩</span>
              <span className="text-sm font-medium text-red-500">
                সাইন আউট
              </span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <Link href="/signin">
            <button className="btn btn-soft">সাইন ইন</button>
          </Link>

          <Link href="/signup">
            <button className="btn btn-success">সাইন আপ</button>
          </Link>
        </>
      )}

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
    </div>
  );
};

export default Userinfo;
