import { notFound } from "next/navigation";
import { getCategoryData } from "../../../lib/category-api";
import CategoryProductGrid from "../../components/category/CategoryProductGrid";
import CategorySort from "../../components/category/CategorySort";

export default async function CategoryPage({ params, searchParams }) {
  const { id } = await params;
  const query = await searchParams;
  const { category, products } = await getCategoryData(id);

  if (!category || products.length === 0) {
    notFound();
  }

  const requestedSort = query?.sort;
  const sort = ["default", "asc", "desc"].includes(requestedSort)
    ? requestedSort
    : "default";

  const sortedProducts = [...products];

  if (sort === "asc") {
    sortedProducts.sort((a, b) => Number(a.today || 0) - Number(b.today || 0));
  } else if (sort === "desc") {
    sortedProducts.sort((a, b) => Number(b.today || 0) - Number(a.today || 0));
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 sm:py-8">
      {" "}
      <div className="mx-auto max-w-5xl">
        {" "}
        <CategorySort sort={sort} productCount={products.length} />
        <CategoryProductGrid products={sortedProducts} />
      </div>
    </main>
  );
}
