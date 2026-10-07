import React from "react";

const Nablinks = async () => {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
  const categories = await res.json();

  return (
    <div className="flex gap-6 justify-start py-2 font-semibold">
      {categories.map((category) => (
        <a
          key={category.id}
          href={`/${category.id}`}
          className="flex items-center gap-1"
        >
          <span>{category.icon}</span>
          <span>{category.nameBn}</span>
        </a>
      ))}
    </div>
  );
};

export default Nablinks;