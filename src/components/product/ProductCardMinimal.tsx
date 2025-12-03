import { Link } from "react-router-dom";
import { X, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface ProductCardMinimalProps {
  product: Product;
}

export function ProductCardMinimal({ product }: ProductCardMinimalProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in-up"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            onClick={handleAddToCart}
            className="w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Discount Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          </div>
        )}

        {/* Add to Cart Overlay */}
        <div className="absolute bottom-3 right-3">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-base line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mt-1">{product.category}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
