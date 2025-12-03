import { Link } from "react-router-dom";
import { categories } from "@/data/products";

export function CategorySection() {
  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground">
            Explore our wide range of product categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/?category=${category.id}`}
              className="group relative overflow-hidden rounded-2xl aspect-square animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                <span className="text-3xl mb-2 block">{category.icon}</span>
                <h3 className="text-primary-foreground font-semibold">{category.name}</h3>
              </div>
              <div className="absolute inset-0 border-2 border-primary/0 rounded-2xl group-hover:border-primary/50 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
