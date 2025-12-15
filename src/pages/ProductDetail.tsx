import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Shirt, PaintBucket, Footprints } from "lucide-react";
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

  const product = products.find((p) => p.id === id);

  // Get similar products for the floating items
  const similarProducts = products.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  ).slice(0, 6);

  // Get recommended items to show in the right panel (different categories)
  const recommendedItems = products.filter(
    (p) => p.id !== product?.id
  ).slice(0, 3);

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

  const totalPrice = recommendedItems.reduce((sum, item) => sum + item.price, 0);

  const handleOrderNow = () => {
    // Add all recommended items to cart
    recommendedItems.forEach(item => addToCart(item));
    if (isAuthenticated) {
      navigate("/checkout?step=address");
    } else {
      navigate("/auth?redirect=/checkout?step=address");
    }
  };

  // Positions for floating related products in a circle
  const floatingPositions = [
    { top: "8%", left: "25%", size: "w-14 h-14" },
    { top: "8%", left: "65%", size: "w-12 h-12" },
    { top: "30%", left: "5%", size: "w-12 h-12" },
    { top: "32%", left: "80%", size: "w-14 h-14" },
    { top: "70%", left: "10%", size: "w-12 h-12" },
    { top: "72%", left: "75%", size: "w-14 h-14" },
  ];

  const getItemIcon = (index: number) => {
    const icons = [Shirt, PaintBucket, Footprints];
    const Icon = icons[index % icons.length];
    return <Icon className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-140px)] bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 dark:from-background dark:via-background dark:to-background">
        <div className="container mx-auto px-4 py-8">
          {/* Main 3-Column Layout */}
          <div className="flex items-center justify-center gap-0 lg:gap-4 min-h-[70vh]">
            
            {/* LEFT: Related Products in Circle */}
            <div className="hidden lg:block relative w-72 h-[450px]">
              {/* Large circle outline */}
              <div className="absolute inset-4 border border-border/40 rounded-full" />
              
              {/* Floating product items around the circle */}
              {similarProducts.map((item, index) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="absolute group z-10"
                  style={{
                    top: floatingPositions[index]?.top,
                    left: floatingPositions[index]?.left,
                  }}
                >
                  <div className={cn(
                    "rounded-full bg-card border border-border shadow-lg overflow-hidden hover:scale-110 transition-all duration-300 hover:shadow-xl",
                    floatingPositions[index]?.size || "w-14 h-14"
                  )}>
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
              {/* Decorative outer curve connecting to left circle */}
              <div className="hidden lg:block absolute -left-12 top-1/2 -translate-y-1/2 w-24 h-64 border-l border-border/30 rounded-l-full" />
              
              {/* Decorative outer curve connecting to right circle */}
              <div className="hidden lg:block absolute -right-12 top-1/2 -translate-y-1/2 w-24 h-64 border-r border-border/30 rounded-r-full" />
              
              {/* Main product oval container */}
              <div className="relative w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[420px] rounded-[50%] overflow-hidden bg-gradient-to-b from-orange-300 via-pink-300 to-orange-200 dark:from-primary/30 dark:via-primary/20 dark:to-primary/30 shadow-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Wishlist button */}
                <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors shadow-lg">
                  <Heart className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
                </button>
              </div>
            </div>

            {/* RIGHT: Item List & Order */}
            <div className="hidden lg:block relative w-72 h-[450px]">
              {/* Large circle outline */}
              <div className="absolute inset-4 border border-border/40 rounded-full" />
              
              {/* Content - item list */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 space-y-4">
                {/* Item count */}
                <h2 className="text-3xl font-bold text-foreground">
                  {recommendedItems.length} item
                </h2>

                {/* Item list */}
                <div className="space-y-3">
                  {recommendedItems.map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getItemIcon(index)}
                        <span className="text-sm text-muted-foreground">{item.name.split(' ')[0]}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">${item.price.toFixed(0)}</span>
                    </div>
                  ))}
                </div>

                {/* Total and Order button */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-2xl font-bold text-foreground">
                    ${totalPrice.toFixed(0)}
                  </span>
                  <Button 
                    className="rounded-full bg-foreground hover:bg-foreground/90 text-background px-5 h-10"
                    onClick={handleOrderNow}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order now
                  </Button>
                </div>
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
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                className="flex-1 h-11 rounded-full bg-foreground hover:bg-foreground/90 text-background"
                onClick={handleOrderNow}
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
