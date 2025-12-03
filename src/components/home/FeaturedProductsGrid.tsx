import { products } from "@/data/products";
import { ProductCardMinimal } from "@/components/product/ProductCardMinimal";

interface FeaturedProductsGridProps {
  categoryFilter?: string;
  searchQuery?: string;
}

export function FeaturedProductsGrid({ categoryFilter, searchQuery }: FeaturedProductsGridProps) {
  let filteredProducts = products;

  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Products` : "Featured Products"}
          </h2>
          {filteredProducts.length > 0 && (
            <span className="text-muted-foreground text-sm">
              {filteredProducts.length} products
            </span>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.slice(0, 10).map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCardMinimal product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found</p>
          </div>
        )}
      </div>
    </section>
  );
}
