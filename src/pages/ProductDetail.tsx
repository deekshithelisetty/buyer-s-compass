import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
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

  // Positions for floating related products within the circle
  const floatingPositions = [
    { top: "12%", left: "32%", size: "w-14 h-14", rotate: "-5deg" },
    { top: "8%", left: "55%", size: "w-12 h-12", rotate: "5deg" },
    { top: "38%", left: "18%", size: "w-14 h-14", rotate: "-8deg" },
    { top: "35%", left: "65%", size: "w-14 h-14", rotate: "8deg" },
    { top: "62%", left: "20%", size: "w-12 h-12", rotate: "-5deg" },
    { top: "70%", left: "45%", size: "w-14 h-14", rotate: "0deg" },
  ];

  // SVG icons matching the reference image style
  const TshirtIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-muted-foreground">
      <path d="M20 6L17 3H7L4 6l3 2v12h10V8l3-2z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const PantIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-muted-foreground">
      <path d="M6 2h12v4l-2 16h-3l-1-12-1 12H8L6 6V2z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ShoeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-muted-foreground">
      <path d="M2 16l2-4h4l2 2h10a2 2 0 012 2v2H2v-2z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 12l2-6h4l2 2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const getItemIcon = (index: number) => {
    const icons = [TshirtIcon, PantIcon, ShoeIcon];
    const Icon = icons[index % icons.length];
    return <Icon />;
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-140px)] bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 dark:from-background dark:via-background dark:to-background">
        <div className="container mx-auto px-4 py-8">
          {/* Main 3-Column Layout */}
          <div className="flex items-center justify-center gap-0 lg:gap-0 min-h-[70vh] relative">
            
           {/* LEFT: Related Products in Circle */}
            <div className="hidden lg:block relative w-[450px] h-[450px] z-10 -mr-16">
              {/* Large round circle outline - thick border overlapping with center */}
              <div className="absolute inset-4 border-[6px] border-muted-foreground/30 rounded-full" />
              
              {/* Floating product items around the circle */}
              {similarProducts.map((item, index) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="absolute group z-20"
                  style={{
                    top: floatingPositions[index]?.top,
                    left: floatingPositions[index]?.left,
                  }}
                >
                  <div 
                    className={cn(
                      "rounded-2xl bg-card border border-border/50 shadow-lg overflow-hidden transition-all duration-300 hover:scale-125 hover:shadow-2xl hover:z-30",
                      floatingPositions[index]?.size || "w-14 h-14"
                    )}
                    style={{ transform: `rotate(${floatingPositions[index]?.rotate || '0deg'})` }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </Link>
              ))}

            </div>

            {/* CENTER: Main Product Image in Oval */}
            <div className="relative flex-shrink-0 z-20">
              {/* Main product container - stadium shape with curved sides */}
              <div className="relative w-56 h-80 md:w-64 md:h-96 lg:w-72 lg:h-[420px] rounded-[50%/30%] overflow-hidden bg-muted shadow-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* RIGHT: Item List & Order */}
            <div className="hidden lg:block relative w-[450px] h-[450px] z-10 -ml-16">
              {/* Large round circle outline - thick border overlapping with center */}
              <div className="absolute inset-4 border-[6px] border-muted-foreground/30 rounded-full" />
              
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
