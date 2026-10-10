import Link from "next/link";

const AllProducts = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data = await res.json();

  const productList = Array.isArray(data) ? data : data.data;
  const formatPrice = (price) => new Intl.NumberFormat("bn-BD").format(price);

  return (
    <section className="mb-10 bg-[#f0f5f0] scroll-mt-24 py-10" id="সব-পণ্য">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#202a23] md:text-2xl">
          সব পণ্য
        </h2>
        <p className="mt-2 text-sm text-[#68736b]">
          মোট {formatPrice(productList.length)}টি পণ্যের দাম দেখানো হচ্ছে
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productList.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="rounded-2xl border border-[#dce7de] bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
                {product.image || product.categoryIcon || "🛒"}
              </div>

              <div className="min-w-0">
                <h3 className="truncate font-bold text-[#202a23]">
                  {product.nameBn}
                </h3>
                <p className="text-xs text-[#68736b]">
                  প্রতি{" "}
                  {product.unit === "kg"
                    ? "কেজি"
                    : product.unit === "litre"
                      ? "লিটার"
                      : product.unit}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between gap-2">
              <div>
                <p className="text-xs text-[#68736b]">আজকের দাম</p>
                <p className="mt-1 font-bold text-[#202a23]">
                  {formatPrice(product.today)} টাকা
                </p>
              </div>

              {product.change?.dir === "up" && (
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                  ▲ {formatPrice(Math.abs(product.change.pct))}%
                </span>
              )}

              {product.change?.dir === "down" && (
                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                  ▼ {formatPrice(Math.abs(product.change.pct))}%
                </span>
              )}

              {(!product.change ||
                product.change.dir === "flat" ||
                product.change.pct === 0) && (
                <span className="rounded-full bg-[#f0f5f0] px-2.5 py-1 text-xs font-semibold text-[#68736b]">
                  — ০.০%
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
