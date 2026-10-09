const API_URL = "https://api.abcz.workers.dev/api/bazardor";

async function fetchJson(url) {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  return response.json();
}

export async function getCategoryData(id) {
  const [categoriesData, productsData] = await Promise.all([
    fetchJson(`${API_URL}/categories`),
    fetchJson(`${API_URL}/products`),
  ]);

  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.data || [];

  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.data || [];

  const category = categories.find((item) => String(item.id) === String(id));

  if (!category) {
    return {
      category: null,
      products: [],
    };
  }

  const categoryProducts = products.filter(
    (product) => String(product.category) === String(category.id),
  );

  return {
    category,
    products: categoryProducts,
  };
}
