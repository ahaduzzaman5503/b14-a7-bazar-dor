import Image from "next/image";
import Link from "next/link";

import PriceChange from "./PriceChange";
import { formatPrice, getUnit, isValidImageUrl } from "../../../lib/formatters";

export default function ProductCard({ product }) {
  const validImage = isValidImageUrl(product.image);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group rounded-xl border border-[#dce7de] bg-[#fbfdfb] p-3 transition hover:-translate-y-0.5 hover:border-[#b7d7c0] hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#edf4ee] text-2xl">
          {validImage ? (
            <Image
              src={product.image}
              alt={product.nameBn || "পণ্যের ছবি"}
              width={80}
              height={80}
              className="h-full w-full object-cover"
              unoptimized
            />
          ) : (
            <span>{product.categoryIcon || "🥬"}</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-bold text-[#202a23] transition group-hover:text-[#07833e]">
            {product.nameBn}
          </h2>

          <p className="mt-1 text-[11px] text-[#68736b]">
            {getUnit(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-[10px] text-[#68736b]">বর্তমান দাম</p>

          <p className="mt-0.5 text-sm font-bold text-[#202a23]">
            {formatPrice(product.today)} টাকা
          </p>
        </div>

        <PriceChange change={product.change} />
      </div>
    </Link>
  );
}
