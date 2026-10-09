export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 sm:py-8">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="flex items-center gap-3 rounded-xl border border-[#dce7de] bg-[#fbfdfb] p-5">
          <div className="h-12 w-12 rounded-xl bg-gray-200" />

          <div className="flex-1 space-y-2">
            <div className="h-5 w-32 rounded bg-gray-200" />
            <div className="h-3 w-48 max-w-full rounded bg-gray-200" />
          </div>
        </div>

        <div className="mt-4 h-16 rounded-xl border border-[#dce7de] bg-[#fbfdfb]" />

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-28 rounded-xl border border-[#dce7de] bg-[#fbfdfb] p-3"
            >
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-3 w-16 rounded bg-gray-200" />
                </div>
              </div>
              <div className="mt-5 h-4 w-20 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
