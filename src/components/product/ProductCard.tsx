import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

// Generate a soft background color based on category
const categoryBgColors: Record<string, string> = {
  electronics: "bg-amber-100",
  fashion: "bg-rose-100",
  home: "bg-emerald-100",
  sports: "bg-blue-100",
  books: "bg-orange-100",
  beauty: "bg-purple-100",
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const bgColor = categoryBgColors[product.category] || "bg-secondary";

  return (
    <div
      className="group relative bg-card rounded-2xl overflow-hidden card-shadow hover:card-hover-shadow transition-all duration-500 animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className={cn("block relative aspect-square overflow-hidden", bgColor)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
            -{discount}% OFF
          </span>
        )}
        
        {product.inStock === false && (
          <span className="absolute top-3 left-3 bg-muted text-muted-foreground text-xs font-medium px-3 py-1.5 rounded-lg">
            Sold Out
          </span>
        )}

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-card shadow-md flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="w-5 h-5 text-muted-foreground hover:text-destructive transition-colors" />
        </button>
      </Link>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Category tag */}
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          {product.category}
        </span>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < Math.floor(product.rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-muted fill-muted"
                )}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{product.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-2xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-base text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full mt-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12"
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
