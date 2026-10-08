"use client";

import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

const PriceTicker = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        const productData = Array.isArray(data) ? data : data.data || [];

        setProducts(productData);
      } catch (error) {
        console.error("Price ticker error:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!products.length) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
      <Marquee
        direction="left"
        speed={70}
        autoFill={true}
        pauseOnHover={true}
        gradient={false}
      >
        {products.map((product) => {
          const isUp = product.change?.dir === "up";

          return (
            <div
              key={product.id}
              className="flex h-9 shrink-0 items-center border-r border-gray-200 px-4 text-sm"
            >
              <span className="mr-2 text-base">
                {product.categoryIcon || product.image || "📦"}
              </span>

              <span className="font-medium text-gray-700">
                {product.nameBn}
              </span>

              <span className="ml-2 text-gray-600">
                {product.today} টাকা/{getUnitName(product.unit)}
              </span>

              <span
                className={`ml-2 font-semibold ${
                  isUp ? "text-red-500" : "text-green-500"
                }`}
              >
                {isUp ? "▲" : "▼"}{" "}
                {Math.abs(product.change?.pct ?? 0).toFixed(1)}%
              </span>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

const getUnitName = (unit) => {
  const units = {
    kg: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    piece: "টি",
    dozen: "ডজন",
  };

  return units[unit] || unit;
};

export default PriceTicker;
