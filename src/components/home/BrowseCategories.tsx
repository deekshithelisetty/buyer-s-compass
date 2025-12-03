import { useState } from "react";
import { Link } from "react-router-dom";

const categoryProducts = [
  {
    id: "shoes",
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    category: "sports",
  },
  {
    id: "bags",
    name: "Bag",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
    category: "fashion",
  },
  {
    id: "watches",
    name: "Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    category: "electronics",
  },
  {
    id: "tshirts",
    name: "T-Shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "fashion",
  },
  {
    id: "headphones",
    name: "Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    category: "electronics",
  },
  {
    id: "sunglasses",
    name: "Sunglasses",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    category: "fashion",
  },
];

const filters = ["All", "Fashion", "Electronics", "Sports"];

export function BrowseCategories() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts =
    activeFilter === "All"
      ? categoryProducts
      : categoryProducts.filter(
          (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Browse by categories
          </h2>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-foreground text-background"
                    : "bg-secondary text-foreground hover:bg-muted"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/?category=${product.category}`}
              className="group bg-secondary rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-card-hover transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-full aspect-square rounded-xl bg-muted/50 flex items-center justify-center overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-sm font-medium text-foreground uppercase tracking-wide">
                {product.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
