import { Link } from "react-router-dom";
import { 
  Shirt, 
  Laptop, 
  Home, 
  Dumbbell, 
  Sparkles, 
  BookOpen 
} from "lucide-react";
import { categories } from "@/data/products";

const categoryIcons: Record<string, React.ReactNode> = {
  fashion: <Shirt className="w-5 h-5" />,
  electronics: <Laptop className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  sports: <Dumbbell className="w-5 h-5" />,
  beauty: <Sparkles className="w-5 h-5" />,
  books: <BookOpen className="w-5 h-5" />,
};

export function CategoryTabs() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Shop by Category
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={{ pathname: "/", search: `category=${category.id}` }}
              className="group flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-muted-foreground group-hover:text-primary transition-colors">
                {categoryIcons[category.id] || <Sparkles className="w-5 h-5" />}
              </span>
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
