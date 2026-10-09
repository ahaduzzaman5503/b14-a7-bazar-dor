export default function CategoryHeader({ category, productCount }) {
  return (
    <section className="flex items-center gap-3 rounded-xl border border-[#dce7de] bg-[#fbfdfb] p-4 sm:p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#edf4ee] text-3xl">
        {category.icon || category.categoryIcon || "🥬"}
      </div>

      <div className="min-w-0">
        <h1 className="text-xl font-bold text-[#202a23] sm:text-2xl">
          {category.nameBn ||
            category.categoryNameBn ||
            category.name ||
            "পণ্যের বিভাগ"}
        </h1>

        <p className="mt-1 text-xs text-[#68736b]">
          {productCount.toLocaleString("bn-BD")}টি পণ্যের দাম ও বাজারদর
        </p>
      </div>
    </section>
  );
}
