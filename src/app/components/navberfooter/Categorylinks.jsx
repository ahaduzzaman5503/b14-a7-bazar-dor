"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Nablinks = () => {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        setCategories(data);
      } catch (error) {
        console.error("Category fetch error:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex gap-2 justify-center py-2 font-semibold">
      {categories.map((category) => {
        const href = `/${category.id}`;

        const isActive = pathname === href;

        return (
          <Link
            key={category.id}
            href={href}
            className={`
              flex items-center gap-1
              px-4 py-2
              rounded-md
              transition-colors
              ${
                isActive
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-700"
              }
            `}
          >
            <span>{category.icon}</span>

            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Nablinks;
