import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#dce7de] bg-[#fbfdfb] p-8 text-center">
        <div className="text-5xl">🥬</div>

        <h1 className="mt-4 text-xl font-bold text-[#202a23]">
          বিভাগটি পাওয়া যায়নি
        </h1>

        <p className="mt-2 text-sm text-[#68736b]">
          এই বিভাগে কোনো পণ্য নেই অথবা বিভাগটি বিদ্যমান নয়।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-[#079447] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#07833e]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
