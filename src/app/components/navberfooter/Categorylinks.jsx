"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Categorylinks = () => {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories",
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        setCategories(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Category fetch error:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="flex gap-2 overflow-x-auto px-3 py-2">
      <Link
        href="/"
        className={`shrink-0 rounded-full px-3 py-2 text-xs font-medium transition ${
          pathname === "/"
            ? "bg-[#079447] text-white"
            : "text-[#303a32] hover:bg-[#edf4ee]"
        }`}
      >
        🏠 হোম
      </Link>

      {categories.map((category) => {
        const href = `/category/${category.id}`;
        const isActive = pathname === href;

        return (
          <Link
            key={category.id}
            href={href}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition ${
              isActive
                ? "bg-[#079447] text-white"
                : "text-[#303a32] hover:bg-[#edf4ee]"
            }`}
          >
            <span>{category.icon || category.categoryIcon || "🥬"}</span>

            <span>
              {category.nameBn || category.categoryNameBn || category.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Categorylinks;
