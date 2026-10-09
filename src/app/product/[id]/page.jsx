import Link from "next/link";

const formatPrice = (price) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);

const getUnit = (unit) => {
  const units = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return units[unit] || unit || "";
};

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${id}`)
  const product = await res.json();

  const markets = product.markets;
  const minPrice = Math.min(...markets.map((market) => market.min));
  const maxPrice = Math.max(...markets.map((market) => market.max));

  const avgPrice =
    markets.reduce((sum, market) => sum + (market.min + market.max) / 2, 0) /
    markets.length;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-[#68736b]">
          <Link href="/" className="hover:text-[#202a23]">
            হোম
          </Link>
          <span>›</span>
          <span>{product.categoryNameBn || product.category}</span>
          <span>›</span>
          <span className="text-[#202a23]">{product.nameBn}</span>
        </nav>

        <section className="mb-5 flex flex-col justify-between gap-5 rounded-2xl border border-[#dce7de] bg-[#fbfdfb] p-5 sm:flex-row sm:items-center md:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-4xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#202a23] md:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-[#68736b]">
                প্রতি {getUnit(product.unit)} ·{" "}
                {product.categoryNameBn || product.category}
              </p>

              <p className="mt-2 text-sm text-[#202a23]">
                গতকালের তুলনায় আজ দাম{" "}
                {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                {product.change?.pct !== undefined &&
                  ` · ${formatPrice(Math.abs(product.change.pct))}%`}
              </p>
            </div>
          </div>

          <div className="min-w-[125px] rounded-2xl bg-[#f0f5f0] p-4 text-center">
            <p className="text-xs text-[#68736b]">আজকের দাম</p>
            <p className="mt-1 text-3xl font-bold text-[#202a23]">
              {formatPrice(product.today)}
            </p>
            <p className="text-sm text-[#68736b]">
              টাকা / {getUnit(product.unit)}
            </p>

            <p
              className={`mt-2 text-sm font-semibold ${
                isUp
                  ? "text-red-600"
                  : isDown
                    ? "text-green-600"
                    : "text-[#68736b]"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {formatPrice(Math.abs(product.change?.pct || 0))}%
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-[#dce7de] bg-[#fbfdfb] p-5 md:p-6">
          <h2 className="mb-4 text-lg font-bold text-[#202a23]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#dce7de] p-4">
              <p className="text-sm text-[#68736b]">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-2xl font-bold text-green-600">
                {formatPrice(minPrice)} টাকা
              </p>
              <p className="mt-1 text-xs text-[#68736b]">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-[#dce7de] p-4">
              <p className="text-sm text-[#68736b]">সর্বোচ্চ দাম</p>
              <p className="mt-1 text-2xl font-bold text-red-600">
                {formatPrice(maxPrice)} টাকা
              </p>
              <p className="mt-1 text-xs text-[#68736b]">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-[#dce7de] p-4">
              <p className="text-sm text-[#68736b]">গড় দাম</p>
              <p className="mt-1 text-2xl font-bold text-green-600">
                {formatPrice(avgPrice)} টাকা
              </p>
              <p className="mt-1 text-xs text-[#68736b]">
                বাজারগুলোর আনুমানিক গড়
              </p>
            </div>
          </div>

          <div className="mt-7">
            <h2 className="mb-4 text-lg font-bold text-[#202a23]">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-[#dce7de]">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-[#f0f5f0] text-[#68736b]">
                  <tr>
                    <th className="px-4 py-4 font-semibold">বাজার</th>
                    <th className="px-4 py-4 font-semibold">বিভাগ</th>
                    <th className="px-4 py-4 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">
                      সর্বোচ্চ
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const marketAverage = (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-t border-[#dce7de] even:bg-[#f0f5f0]/60"
                      >
                        <td className="px-4 py-4 font-medium text-[#202a23]">
                          {market.market}
                        </td>

                        <td className="px-4 py-4 text-[#68736b]">
                          {market.division}
                        </td>

                        <td className="px-4 py-4 text-right text-green-600">
                          {formatPrice(market.min)} টাকা
                        </td>

                        <td className="px-4 py-4 text-right text-red-600">
                          {formatPrice(market.max)} টাকা
                        </td>

                        <td className="px-4 py-4 text-right font-bold text-[#202a23]">
                          {formatPrice(marketAverage)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
