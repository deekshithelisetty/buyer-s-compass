import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { ArrowUpRight } from "lucide-react";

export function CategorySection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Browse Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Shop by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated collections across different categories
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px]">
          {categories.map((category, index) => {
            // Create varied sizes for bento grid effect
            const sizes = [
              "col-span-2 row-span-2",
              "col-span-1 row-span-1",
              "col-span-1 row-span-2",
              "col-span-2 row-span-1",
              "col-span-1 row-span-1",
              "col-span-1 row-span-1",
            ];
            const sizeClass = sizes[index % sizes.length];

            return (
              <Link
                key={category.id}
                to={`/?category=${category.id}`}
                className={`group relative overflow-hidden rounded-3xl ${sizeClass} animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Glassmorphism card */}
                <div className="absolute inset-x-3 bottom-3 p-4 rounded-2xl bg-card/20 backdrop-blur-md border border-white/10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl mb-1 block">{category.icon}</span>
                      <h3 className="text-primary-foreground font-bold text-lg">{category.name}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
