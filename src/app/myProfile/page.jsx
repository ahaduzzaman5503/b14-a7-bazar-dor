"use client";

import { authClient } from "../../lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter();

  const [name, setName] = useState("");

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { data, error } = await authClient.updateUser({
      name,
    });
    toast.success("Name Updated Succesful");
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  return (
    <main className="min-h-screen bg-[#f3f8f4] px-4 py-5">
      <div className="mx-auto max-w-[520px]">
        <div className="mb-5">
          <h1 className="text-lg font-bold text-[#202a23]">আমার প্রোফাইল</h1>

          <p className="mt-1 text-lg text-[#7b827d]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </div>

        <div className="mb-4 rounded-[12px] border border-[#dce5df] bg-white px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                <Image
                  src={user?.image}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#202a23]">
                  {user?.name}
                </h2>

                <p className="mt-0.5 text-xl text-[#6f7772]">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              type="button"
              className="rounded-md border border-red-400 bg-white px-3 py-1.5 text-[16px] font-medium text-red-500 transition hover:bg-red-50"
            >
              ↩ সাইন আউট
            </button>
          </div>
        </div>

        <div className="rounded-[12px] border border-[#dce5df] bg-white px-4 py-4">
          <h2 className="text-2xl font-semibold text-[#202a23]">তথ্য</h2>

          <form onSubmit={handleUpdate} className="mt-7">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block pl-4 text-2xl font-medium text-[#303530]"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-[29px] w-full rounded-md border border-[#dce4df] bg-white px-3 text-2xl text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#079447] focus:ring-1 focus:ring-[#079447]"
              />
            </div>

            <button
              type="submit"
              className="mt-3 h-[30px] w-full rounded-md bg-[#079447] text-xl font-medium text-white shadow-[0_2px_3px_rgba(0,0,0,0.2)] transition hover:bg-[#07833e] active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default ProfilePage;
