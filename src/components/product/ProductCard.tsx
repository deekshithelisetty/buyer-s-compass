import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative bg-card rounded-2xl overflow-hidden card-shadow hover:card-hover-shadow transition-all duration-500 animate-fade-in-up hover:-translate-y-2"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick action buttons */}
        <div className="absolute bottom-4 inset-x-4 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <Button
            size="icon"
            className="h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm hover:bg-primary text-foreground hover:text-primary-foreground shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            className="h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm hover:bg-primary text-foreground hover:text-primary-foreground shadow-lg"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            className="h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm hover:bg-primary text-foreground hover:text-primary-foreground shadow-lg"
            asChild
          >
            <Link to={`/product/${product.id}`} onClick={(e) => e.stopPropagation()}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
              -{discount}%
            </span>
          )}
          {product.inStock === false && (
            <span className="bg-muted text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-full">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-card hover:scale-110"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="w-4 h-4 text-foreground" />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category tag */}
        <span className="text-xs font-medium text-primary uppercase tracking-wider">
          {product.category}
        </span>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
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
                  "w-3.5 h-3.5",
                  i < Math.floor(product.rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-muted fill-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="cart"
          size="sm"
          className="w-full mt-1 rounded-xl"
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
