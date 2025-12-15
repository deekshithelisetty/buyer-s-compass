import { Link, useSearchParams } from "react-router-dom";
import { 
  Smartphone, 
  Shirt, 
  Home, 
  Dumbbell, 
  BookOpen, 
  Sparkles 
} from "lucide-react";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ReactNode> = {
  electronics: <Smartphone className="w-4 h-4" />,
  fashion: <Shirt className="w-4 h-4" />,
  home: <Home className="w-4 h-4" />,
  sports: <Dumbbell className="w-4 h-4" />,
  books: <BookOpen className="w-4 h-4" />,
  beauty: <Sparkles className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  electronics: "text-blue-500",
  fashion: "text-pink-500",
  home: "text-amber-500",
  sports: "text-green-500",
  books: "text-orange-500",
  beauty: "text-red-500",
};

export function CategoryTabs() {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-1 py-2 overflow-x-auto scrollbar-sleek">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <Link
                key={category.id}
                to={`/?category=${category.id}`}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <span className={cn(
                  "transition-colors",
                  isActive ? "text-primary" : categoryColors[category.id]
                )}>
                  {categoryIcons[category.id] || <Sparkles className="w-4 h-4" />}
                </span>
                <span>{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
