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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="animate-fade-in-up">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary">
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
                className="absolute top-4 right-4 h-10 w-10 rounded-full"
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
              <h1 className="text-3xl md:text-4xl font-display font-bold mt-2">
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
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
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
                <h3 className="font-semibold">Features</h3>
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
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
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
                variant="hero"
                size="xl"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="xl">
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
