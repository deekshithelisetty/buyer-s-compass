import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, CheckCircle, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState<"cart" | "shipping" | "payment">("cart");

  const shipping = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  // Get last added item for confirmation display
  const lastAddedItem = items[items.length - 1];

  // Get related products based on cart items
  const cartCategories = [...new Set(items.map(item => item.category))];
  const relatedProducts = products
    .filter(p => cartCategories.includes(p.category) && !items.find(i => i.id === p.id))
    .slice(0, 8);

  const handlePlaceOrder = () => {
    toast({
      title: "Order Placed Successfully! 🎉",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    });
    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button className="bg-primary hover:bg-primary/90" size="lg" onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        {/* Added to Cart Confirmation Banner */}
        {lastAddedItem && (
          <div className="border border-border rounded-lg mb-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
              {/* Left: Product confirmation */}
              <div className="lg:col-span-8 flex items-center gap-6">
                <img
                  src={lastAddedItem.image}
                  alt={lastAddedItem.name}
                  className="w-20 h-20 object-contain rounded"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-green-600 mb-1">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Added to cart</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {lastAddedItem.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {lastAddedItem.quantity}
                  </p>
                </div>
              </div>

              {/* Right: Cart subtotal */}
              <div className="lg:col-span-4 flex flex-col items-end justify-center gap-2 border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-6">
                <p className="text-lg font-medium">
                  Cart subtotal: <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </p>
                <Button 
                  className="w-full lg:w-auto bg-amber-400 hover:bg-amber-500 text-foreground font-medium rounded-full px-8"
                  onClick={() => setStep("shipping")}
                >
                  Proceed to Buy ({items.reduce((acc, item) => acc + item.quantity, 0)} items)
                </Button>
                <Button 
                  variant="outline"
                  className="w-full lg:w-auto rounded-full px-8"
                  onClick={() => navigate("/checkout")}
                >
                  Go to Cart
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">
                Products related to items in your cart
              </h2>
              <span className="text-sm text-muted-foreground">
                Page 1 of {Math.ceil(relatedProducts.length / 4)}
              </span>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {relatedProducts.slice(0, 6).map((product) => {
                  const discount = product.originalPrice
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : 0;

                  return (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="group block"
                    >
                      <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden mb-2 p-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="text-sm line-clamp-2 text-primary hover:text-primary/80 hover:underline mb-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-3 h-3",
                                i < Math.floor(product.rating)
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-muted-foreground"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-primary">{product.reviews}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded">
                            {discount}% off
                          </span>
                          <span className="text-xs text-destructive">Limited time deal</span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                      </div>
                      {product.originalPrice && (
                        <p className="text-xs text-muted-foreground">
                          M.R.P.: <span className="line-through">${product.originalPrice.toFixed(2)}</span>
                        </p>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full mt-2 rounded-full text-xs h-8 border-border hover:bg-muted"
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to cart logic
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Cart Section */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                <p className="text-sm text-muted-foreground">{items.length} items</p>
              </div>

              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4">
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-contain rounded"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-medium text-primary hover:underline line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-green-600 mt-1">In Stock</p>
                      <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
                      
                      <div className="flex items-center gap-4 mt-3">
                        {/* Quantity selector */}
                        <div className="flex items-center border border-border rounded bg-muted/50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <span className="text-muted-foreground">|</span>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-primary hover:underline"
                        >
                          Delete
                        </button>
                        
                        <span className="text-muted-foreground">|</span>
                        
                        <button className="text-sm text-primary hover:underline">
                          Save for later
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      {item.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          ${(item.originalPrice * item.quantity).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border text-right">
                <p className="text-lg">
                  Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items): 
                  <span className="font-bold ml-2">${totalPrice.toFixed(2)}</span>
                </p>
              </div>
            </div>

            {/* Shipping Form */}
            {step !== "cart" && (
              <div className="p-6 bg-card border border-border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-4 p-4 bg-card border border-border rounded-lg space-y-4">
              {totalPrice < 50 && (
                <div className="text-sm text-green-600 bg-green-50 dark:bg-green-950/20 p-3 rounded">
                  Add ${(50 - totalPrice).toFixed(2)} more for FREE Shipping
                </div>
              )}

              <p className="text-lg">
                Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items): 
                <span className="font-bold ml-2">${totalPrice.toFixed(2)}</span>
              </p>

              {step === "cart" ? (
                <Button
                  className="w-full bg-amber-400 hover:bg-amber-500 text-foreground font-medium rounded-full"
                  onClick={() => {
                    if (!isAuthenticated) {
                      navigate("/auth");
                    } else {
                      setStep("shipping");
                    }
                  }}
                >
                  {isAuthenticated ? "Proceed to checkout" : "Sign in to checkout"}
                </Button>
              ) : (
                <Button
                  className="w-full bg-amber-400 hover:bg-amber-500 text-foreground font-medium rounded-full"
                  onClick={handlePlaceOrder}
                >
                  Place your order
                </Button>
              )}

              <div className="text-xs text-muted-foreground space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-foreground text-sm pt-2 border-t border-border">
                  <span>Order Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
