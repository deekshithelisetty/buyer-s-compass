import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Minus, Plus, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate("/")}>Go back home</Button>
        </div>
      </Layout>
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

  // Generate background color based on category
  const categoryBgColors: Record<string, string> = {
    electronics: "bg-amber-200",
    fashion: "bg-rose-200",
    home: "bg-emerald-200",
    sports: "bg-blue-200",
    books: "bg-orange-200",
    beauty: "bg-purple-200",
  };

  const bgColor = categoryBgColors[product.category] || "bg-secondary";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <div className="animate-fade-in-up">
            <div className={cn("relative aspect-square rounded-3xl overflow-hidden", bgColor)}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
              {discount > 0 && (
                <span className="absolute top-5 left-5 bg-destructive text-destructive-foreground text-sm font-bold px-4 py-2 rounded-xl shadow-lg">
                  -{discount}% OFF
                </span>
              )}
              <button
                className="absolute top-5 right-5 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center transition-all hover:scale-110"
              >
                <Heart className="w-6 h-6 text-muted-foreground hover:text-destructive transition-colors" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-5 animate-fade-in-up delay-200">
            <div>
              <span className="text-sm text-primary font-semibold uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold mt-2 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < Math.floor(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted fill-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-foreground font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-base">
              {product.description}
            </p>

            {/* Features */}
            {product.features && (
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Features</h3>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-medium text-foreground">Quantity:</span>
              <div className="flex items-center border border-border rounded-full bg-card">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-2">
              <Button
                className="flex-1 h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="h-14 px-8 rounded-xl font-semibold text-base border-2"
              >
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
                  <item.icon className="w-7 h-7 mx-auto text-primary mb-2" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {(() => {
          const similarProducts = products.filter(
            (p) => p.category === product.category && p.id !== product.id
          ).slice(0, 4);
          
          if (similarProducts.length === 0) return null;
          
          return (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">Similar Products</h2>
                <Link 
                  to={`/?category=${product.category}`}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View All
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similarProducts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="group relative bg-secondary rounded-2xl overflow-hidden aspect-square transition-transform hover:scale-[1.02]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-medium text-sm line-clamp-1">{item.name}</p>
                      <p className="text-white/80 text-sm font-bold">${item.price.toFixed(2)}</p>
                    </div>
                    <button 
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/product/${item.id}`);
                      }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-foreground" />
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </Layout>
  );
};

export default ProductDetail;
