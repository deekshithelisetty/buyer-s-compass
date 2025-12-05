import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Minus, Plus, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-muted/30 px-4 md:px-7 py-2">
        <div className="bg-muted rounded-3xl min-h-[calc(100vh-1rem)] overflow-hidden shadow-xl">
          <SearchHeader />
          <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4 text-foreground">Product not found</h1>
              <Button onClick={() => navigate("/")}>Go back home</Button>
            </div>
          </div>
        </div>
        <FloatingChatButton onClick={() => navigate("/?category=electronics")} />
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 px-4 md:px-7 py-2">
      <div className="bg-muted rounded-3xl min-h-[calc(100vh-1rem)] overflow-hidden shadow-xl">
        <SearchHeader />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="animate-fade-in-up">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-background shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1.5 rounded-lg">
                    -{discount}% OFF
                  </span>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-fade-in-up delay-200">
              <div>
                <span className="text-sm text-primary font-medium uppercase tracking-wide">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(product.rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="text-foreground font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground">
                  {product.price.toFixed(2)} <span className="text-lg">AED</span>
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice.toFixed(2)} AED
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              {product.features && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Features</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-foreground">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg bg-background">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-[#0081CF] hover:bg-[#006bb3] text-white rounded-full py-6"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="rounded-full py-6 px-8">
                  Buy Now
                </Button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                {[
                  { icon: Truck, text: "Free Shipping" },
                  { icon: Shield, text: "2 Year Warranty" },
                  { icon: RotateCcw, text: "30-Day Returns" },
                ].map((item) => (
                  <div key={item.text} className="text-center">
                    <item.icon className="w-6 h-6 mx-auto text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FloatingChatButton onClick={() => navigate("/?category=electronics")} />
    </div>
  );
};

export default ProductDetail;
