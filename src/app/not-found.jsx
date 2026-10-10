
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] px-4 " >
      <div className="max-w-md text-center shadow-2xl p-10 rounded-2xl">
        <h1 className="text-8xl font-extrabold text-green-600">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-600">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}

