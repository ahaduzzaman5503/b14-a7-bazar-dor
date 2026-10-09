import ProductCard from "./ProductCard";

export default function CategoryProductGrid({ products }) {
  return (
    <section className="mt-4">
      <p className="mb-3 text-xs text-[#68736b]">পণ্যের তালিকা</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
