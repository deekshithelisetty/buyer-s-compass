import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

interface FeaturedProductsProps {
  categoryFilter?: string;
  searchQuery?: string;
}

export function FeaturedProducts({ categoryFilter, searchQuery }: FeaturedProductsProps) {
  let filteredProducts = products;

  if (categoryFilter) {
    filteredProducts = filteredProducts.filter((p) => p.category === categoryFilter);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
              {categoryFilter
                ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Products`
                : searchQuery
                ? `Results for "${searchQuery}"`
                : "Featured Products"}
            </h2>
            <p className="text-muted-foreground">
              {filteredProducts.length} products available
            </p>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No products found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
