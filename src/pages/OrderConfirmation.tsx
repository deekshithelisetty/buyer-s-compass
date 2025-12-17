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
  
  // Get random products for display
  const [displayProducts, setDisplayProducts] = useState(products.slice(0, 6));
  const [orderItems, setOrderItems] = useState(products.slice(0, 3));
  const mainProduct = products[0];

  // Floating positions for related products
  const floatingPositions = [
    { top: "12%", left: "32%", size: "w-14 h-14", rotate: "-5deg" },
    { top: "8%", left: "55%", size: "w-12 h-12", rotate: "5deg" },
    { top: "38%", left: "18%", size: "w-14 h-14", rotate: "-8deg" },
    { top: "35%", left: "65%", size: "w-14 h-14", rotate: "8deg" },
    { top: "62%", left: "20%", size: "w-12 h-12", rotate: "-5deg" },
    { top: "70%", left: "45%", size: "w-14 h-14", rotate: "0deg" },
  ];

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price, 0);

  const handleRegenerateOutfit = () => {
    // Shuffle products for new outfit
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    setDisplayProducts(shuffled.slice(0, 6));
    setOrderItems(shuffled.slice(0, 3));
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-140px)] bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 dark:from-background dark:via-background dark:to-background">
        <div className="container mx-auto px-4 py-6">
          {/* Main 3-Column Layout */}
          <div className="flex items-center justify-center gap-0 lg:gap-0 min-h-[60vh] relative">
            
            {/* LEFT: Related Products in Circle */}
            <div className="hidden lg:block relative w-[580px] h-[580px] z-10 -mr-20">
              {/* Large round circle outline */}
              <div className="absolute inset-4 border-2 border-muted-foreground/30 rounded-full" />
              
              {/* Floating product items around the circle */}
              {displayProducts.map((item, index) => (
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
            <div className="hidden lg:block relative w-[580px] h-[580px] z-10 -ml-20">
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
