import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Plus } from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  // Get similar products
  const similarProducts = products.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  ).slice(0, 6);

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

  const handleBuyNow = () => {
    addToCart(product);
    if (isAuthenticated) {
      navigate("/checkout?step=address");
    } else {
      navigate("/auth?redirect=/checkout?step=address");
    }
  };

  // Positions for floating related products
  const floatingPositions = [
    { top: "5%", left: "15%" },
    { top: "5%", right: "15%" },
    { top: "35%", left: "5%" },
    { top: "35%", right: "5%" },
    { top: "65%", left: "10%" },
    { top: "65%", right: "10%" },
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-140px)] bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 dark:from-background dark:via-background dark:to-background">
        <div className="container mx-auto px-4 py-8">
          {/* Main 3-Column Layout */}
          <div className="flex items-center justify-center gap-4 lg:gap-8 min-h-[70vh]">
            
            {/* LEFT: Related Products - Floating Circle Layout */}
            <div className="hidden lg:block relative w-64 h-[500px]">
              {/* Decorative circle outline */}
              <div className="absolute inset-0 border border-border/30 rounded-full" />
              
              {/* Floating product items */}
              {similarProducts.slice(0, 3).map((item, index) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="absolute group"
                  style={{
                    top: floatingPositions[index]?.top,
                    left: floatingPositions[index]?.left,
                    right: floatingPositions[index]?.right,
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-card border border-border shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300 hover:shadow-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              ))}

              {/* More floating items bottom */}
              {similarProducts.slice(3, 6).map((item, index) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="absolute group"
                  style={{
                    top: floatingPositions[index + 3]?.top,
                    left: floatingPositions[index + 3]?.left,
                    right: floatingPositions[index + 3]?.right,
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-card border border-border shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300 hover:shadow-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* CENTER: Main Product Image in Oval */}
            <div className="relative flex-shrink-0">
              {/* Decorative outer circle */}
              <div className="absolute -inset-8 border border-border/20 rounded-full" />
              
              {/* Main product oval container */}
              <div className="relative w-72 h-96 md:w-80 md:h-[420px] lg:w-96 lg:h-[480px] rounded-[50%] overflow-hidden bg-gradient-to-b from-orange-200 via-pink-200 to-orange-300 dark:from-primary/20 dark:via-primary/10 dark:to-primary/20 shadow-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Wishlist button */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors shadow-lg">
                  <Heart className="w-5 h-5 text-muted-foreground hover:text-destructive transition-colors" />
                </button>

                {/* Discount badge */}
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
                    -{discount}%
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Product Details & Actions */}
            <div className="hidden lg:block relative w-64 h-[500px]">
              {/* Decorative circle outline */}
              <div className="absolute inset-0 border border-border/30 rounded-full" />
              
              {/* Content card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 bg-card rounded-2xl shadow-xl p-5 space-y-4">
                {/* Product title */}
                <h1 className="text-lg font-bold text-foreground leading-tight line-clamp-2">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(product.rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  {product.originalPrice && (
                    <p className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Qty:</span>
                  <div className="flex items-center border border-border rounded-full bg-muted/30">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center hover:bg-muted rounded-l-full transition-colors text-sm"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-muted rounded-r-full transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-2 pt-2">
                  <Button
                    className="w-full h-9 rounded-full text-sm"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    className="w-full h-9 rounded-full bg-foreground hover:bg-foreground/90 text-background text-sm"
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </div>

                {/* Stock status */}
                <p className={cn(
                  "text-xs text-center",
                  product.inStock ? "text-green-600" : "text-destructive"
                )}>
                  {product.inStock ? "✓ In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile: Product Details Card */}
          <div className="lg:hidden mt-6 bg-card rounded-2xl shadow-xl p-6 space-y-4">
            <h1 className="text-xl font-bold text-foreground">{product.name}</h1>
            
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < Math.floor(product.rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-muted-foreground"
                  )}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground">{product.description}</p>

            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 h-11 rounded-full"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                className="flex-1 h-11 rounded-full bg-foreground hover:bg-foreground/90 text-background"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </div>
          </div>

          {/* Mobile: Related Products */}
          <div className="lg:hidden mt-8">
            <h2 className="text-lg font-semibold mb-4">Related Products</h2>
            <div className="flex gap-3 overflow-x-auto pb-4">
              {similarProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="flex-shrink-0 w-24"
                >
                  <div className="w-24 h-24 rounded-xl bg-muted overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs mt-2 line-clamp-1">{item.name}</p>
                  <p className="text-xs font-bold">${item.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
