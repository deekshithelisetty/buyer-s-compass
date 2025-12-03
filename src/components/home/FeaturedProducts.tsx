import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturedProductsProps {
  categoryFilter?: string;
  searchQuery?: string;
}

export function FeaturedProducts({ categoryFilter, searchQuery }: FeaturedProductsProps) {
  // If there's a filter, show filtered products
  if (categoryFilter || searchQuery) {
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
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10 animate-fade-in-up">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground">
                  {categoryFilter
                    ? categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)
                    : "Search Results"}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                {categoryFilter
                  ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Collection`
                  : `Results for "${searchQuery}"`}
              </h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} products found
              </p>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-muted-foreground">No products found</p>
              <p className="text-sm text-muted-foreground mt-2 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button asChild>
                <Link to="/">Browse All Products</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Group products by category for homepage
  const productsByCategory = categories.map((category) => ({
    ...category,
    products: products.filter((p) => p.category === category.id).slice(0, 4),
  })).filter((cat) => cat.products.length > 0);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Featured Products
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Trending <span className="text-gradient">This Week</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of popular products across all categories
          </p>
        </div>

        {/* Category-wise product sections */}
        <div className="space-y-20">
          {productsByCategory.map((category, catIndex) => (
            <div key={category.id} className="animate-fade-in-up" style={{ animationDelay: `${catIndex * 150}ms` }}>
              {/* Category Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center text-2xl shadow-lg shadow-primary/20">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">Explore our {category.name.toLowerCase()} collection</p>
                  </div>
                </div>
                <Button variant="ghost" asChild className="group hidden md:flex">
                  <Link to={`/?category=${category.id}`}>
                    View All
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {category.products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>

              {/* Mobile View All Button */}
              <div className="md:hidden mt-6 text-center">
                <Button variant="outline" asChild className="w-full">
                  <Link to={`/?category=${category.id}`}>
                    View All {category.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
