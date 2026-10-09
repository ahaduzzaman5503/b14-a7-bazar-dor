export default function CategorySort({ sort, productCount }) {
  return (
    <section className="mt-4 flex flex-col gap-3 rounded-xl border border-[#dce7de] bg-[#fbfdfb] p-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#68736b]">
        মোট {productCount.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে
      </p>

      <form method="GET" className="flex items-center gap-2">
        <label htmlFor="sort" className="shrink-0 text-xs text-[#68736b]">
          সাজান:
        </label>

        <select
          id="sort"
          name="sort"
          defaultValue={sort}
          className="min-w-0 rounded-lg border border-[#dce7de] bg-white px-3 py-2 text-xs text-[#202a23] outline-none focus:border-[#079447]"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>

        <button
          type="submit"
          className="rounded-lg bg-[#079447] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#07833e]"
        >
          সাজান
        </button>
      </form>
    </section>
  );
}
