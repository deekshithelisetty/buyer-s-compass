import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ShoppingCart, Truck, RotateCcw, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

// SVG icons for item list
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

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const total = parseFloat(searchParams.get("total") || "0");
  
  // Get the main product and related products by category
  const mainProduct = products[0];
  const relatedProducts = products
    .filter(p => p.category === mainProduct.category && p.id !== mainProduct.id)
    .slice(0, 8);
  // If not enough related products, fill with other products
  const displayProducts = relatedProducts.length >= 8 
    ? relatedProducts 
    : [...relatedProducts, ...products.filter(p => p.id !== mainProduct.id && !relatedProducts.includes(p))].slice(0, 8);
  
  const [orderItems, setOrderItems] = useState(products.slice(0, 3));

  // Floating positions for 8 products evenly distributed around the circle
  const floatingPositions = [
    { top: "8%", left: "42%", size: "w-16 h-16", rotate: "-3deg" },
    { top: "18%", left: "68%", size: "w-[72px] h-[72px]", rotate: "5deg" },
    { top: "42%", left: "78%", size: "w-16 h-16", rotate: "8deg" },
    { top: "68%", left: "68%", size: "w-[72px] h-[72px]", rotate: "-5deg" },
    { top: "78%", left: "42%", size: "w-16 h-16", rotate: "3deg" },
    { top: "68%", left: "16%", size: "w-[72px] h-[72px]", rotate: "-8deg" },
    { top: "42%", left: "6%", size: "w-16 h-16", rotate: "6deg" },
    { top: "18%", left: "16%", size: "w-[72px] h-[72px]", rotate: "-4deg" },
  ];

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price, 0);

  const handleRegenerateOutfit = () => {
    // Shuffle order items for new outfit
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    setOrderItems(shuffled.slice(0, 3));
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-140px)] bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 dark:from-background dark:via-background dark:to-background">
        <div className="container mx-auto px-4 py-6">
          {/* Main 3-Column Layout */}
          <div className="flex items-center justify-center gap-0 lg:gap-0 min-h-[60vh] relative">
            
            {/* LEFT: Related Products in Circle */}
            <div className="hidden lg:block relative w-[480px] h-[480px] z-10 -mr-16">
              {/* Large round circle outline */}
              <div className="absolute inset-4 border-2 border-muted-foreground/30 rounded-full" />
              
              {/* Floating product items around the circle */}
              {displayProducts.map((item, index) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="absolute group z-20 hover:z-50"
                  style={{
                    top: floatingPositions[index]?.top,
                    left: floatingPositions[index]?.left,
                  }}
                >
                  <div 
                    className={cn(
                      "rounded-2xl bg-card border-2 border-border/50 shadow-lg overflow-hidden transition-all duration-500 ease-out",
                      "hover:scale-[2.5] hover:shadow-2xl hover:border-primary/50 hover:rounded-xl",
                      floatingPositions[index]?.size || "w-16 h-16"
                    )}
                    style={{ transform: `rotate(${floatingPositions[index]?.rotate || '0deg'})` }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Product name tooltip on hover */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-card/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-lg text-xs font-medium z-50">
                    {item.name.split(' ').slice(0, 3).join(' ')}
                  </div>
                </Link>
              ))}
            
            </div>

            {/* CENTER: Main Product Image in Oval */}
            <div className="relative flex-shrink-0 z-20">
              {/* Main product container - stadium shape */}
              <div className="relative w-64 h-96 md:w-72 md:h-[420px] lg:w-80 lg:h-[480px] rounded-[50%/30%] overflow-hidden bg-gradient-to-b from-orange-200 via-pink-200 to-orange-100 shadow-2xl">
                <img
                  src={mainProduct.image}
                  alt={mainProduct.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* RIGHT: Item List & Track Order */}
            <div className="hidden lg:block relative w-[480px] h-[480px] z-10 -ml-16">
              {/* Large round circle outline */}
              <div className="absolute inset-4 border-2 border-muted-foreground/30 rounded-full" />
              
              {/* Content - item list */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 space-y-3">
                {/* Success message */}
                <p className="text-sm text-green-600 dark:text-green-500 font-medium">
                  Order Placed Successfully!
                </p>

                {/* Item names */}
                <div className="space-y-1">
                  {orderItems.map((item) => (
                    <p key={item.id} className="text-sm text-foreground font-medium truncate">
                      {item.name}
                    </p>
                  ))}
                </div>

                {/* Delivery date */}
                <p className="text-sm text-muted-foreground">
                  Delivery by {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>

                {/* Price */}
                <p className="text-lg font-bold text-foreground">
                  ${total > 0 ? total.toFixed(2) : totalPrice.toFixed(2)}
                </p>

                {/* Order number */}
                <p className="text-xs text-muted-foreground">
                  Order #{orderId}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden mt-6 space-y-4">
            {/* Order Summary Card */}
            <div className="bg-card rounded-2xl shadow-xl p-6 space-y-4">
              <h2 className="text-xl font-bold">Your Order</h2>
              
              <div className="space-y-3">
                {orderItems.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="text-sm">{item.name.split(' ').slice(0, 2).join(' ')}</span>
                    </div>
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xl font-bold">Total</span>
                <span className="text-xl font-bold">${total > 0 ? total.toFixed(2) : totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 rounded-full bg-foreground hover:bg-foreground/90 text-background"
                  onClick={() => navigate(`/order-tracking?orderId=${orderId}`)}
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Track Order
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 rounded-full"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>

            {/* Related Products */}
            <div className="bg-card rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">You might also like</h3>
                <button
                  onClick={handleRegenerateOutfit}
                  className="text-sm text-primary flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Refresh
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {displayProducts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="flex-shrink-0 w-20"
                  >
                    <div className="w-20 h-20 rounded-xl bg-muted overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs mt-1 line-clamp-1">{item.name}</p>
                    <p className="text-xs font-bold">${item.price.toFixed(0)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
