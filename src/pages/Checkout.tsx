import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, CheckCircle, Star, ChevronDown, Lock, MapPin, Heart, Share2, Truck } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

// Sample saved addresses
const savedAddresses = [
  {
    id: "1",
    name: "John Doe",
    address: "123 Main Street, Apt 4B, Downtown",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
    phone: "9876543210",
    isDefault: true,
  },
  {
    id: "2",
    name: "John Doe",
    address: "456 Oak Avenue, Suite 100",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
    country: "USA",
    phone: "9876543211",
    isDefault: false,
  },
  {
    id: "3",
    name: "Jane Smith",
    address: "789 Pine Road, Building C",
    city: "Chicago",
    state: "IL",
    zip: "60601",
    country: "USA",
    phone: "9876543212",
    isDefault: false,
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState<"cart" | "address" | "payment" | "confirmation">("cart");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderDate, setOrderDate] = useState<Date | null>(null);
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]?.id || "");
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  // Handle step from URL params
  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam === "address" && items.length > 0) {
      setStep("address");
    }
  }, [searchParams, items.length]);

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
    // Generate order number
    const generatedOrderNumber = `INF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setOrderNumber(generatedOrderNumber);
    setOrderDate(new Date());
    setStep("confirmation");
    clearCart();
    toast({
      title: "Order Placed Successfully! 🎉",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    });
  };

  const handleProceedToAddress = () => {
    if (!isAuthenticated) {
      navigate("/auth");
    } else {
      setStep("address");
    }
  };

  const handleDeliverToAddress = () => {
    setStep("payment");
  };

  const visibleAddresses = showAllAddresses ? savedAddresses : savedAddresses.slice(0, 3);

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

  // Order Confirmation View
  if (step === "confirmation") {
    const selectedAddr = savedAddresses.find(a => a.id === selectedAddress);
    const estimatedDelivery = orderDate ? new Date(orderDate.getTime() + 5 * 24 * 60 * 60 * 1000) : new Date();
    const formatDate = (date: Date) => date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Success Banner */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">Order placed, thank you!</h1>
                  <p className="text-green-600 dark:text-green-500 mt-1">
                    Confirmation will be sent to your email.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Details Card */}
            <div className="border border-border rounded-lg overflow-hidden mb-6">
              <div className="bg-muted/50 px-6 py-4 border-b border-border">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Number</p>
                    <p className="font-bold text-lg">{orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-medium">{orderDate ? formatDate(orderDate) : ""}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <p className="font-medium text-green-600 dark:text-green-400">{formatDate(estimatedDelivery)}</p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              {selectedAddr && (
                <div className="px-6 py-4 border-b border-border">
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{selectedAddr.name}</p>
                      <p>{selectedAddr.address}</p>
                      <p>{selectedAddr.city}, {selectedAddr.state} {selectedAddr.zip}</p>
                      <p>{selectedAddr.country}</p>
                      <p>Phone: {selectedAddr.phone}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="px-6 py-4">
                <h3 className="font-semibold mb-4">Order Items ({items.length})</h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded bg-muted"
                      />
                      <div className="flex-1">
                        <p className="font-medium line-clamp-2">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-muted/30 px-6 py-4 border-t border-border">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span>Order Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 bg-amber-400 hover:bg-amber-500 text-foreground font-medium rounded-full h-12"
                onClick={() => {
                  clearCart();
                  navigate(`/order-tracking?orderId=${orderNumber}`);
                }}
              >
                <Truck className="w-4 h-4 mr-2" />
                Track Order
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-full h-12"
                onClick={() => {
                  clearCart();
                  navigate("/");
                }}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Secure Checkout - Address Selection View
  if (step === "address") {
    // If not authenticated, show sign-in prompt within secure checkout
    if (!isAuthenticated) {
      return (
        <Layout>
          {/* Secure Checkout Header */}
          <div className="border-b border-border bg-muted/30">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <Link to="/" className="text-xl font-bold text-foreground">
                InfinityHub
              </Link>
              <h1 className="text-xl font-medium">Secure Checkout</h1>
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Lock className="w-10 h-10 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Sign in to continue</h2>
              <p className="text-muted-foreground mb-8">
                Please sign in to your account to complete your purchase securely.
              </p>
              <Button
                className="bg-amber-400 hover:bg-amber-500 text-foreground font-medium px-8"
                size="lg"
                onClick={() => navigate("/auth?redirect=/checkout?step=address")}
              >
                Sign In
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                New customer?{" "}
                <Link to="/auth?redirect=/checkout?step=address" className="text-primary hover:underline">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        {/* Secure Checkout Header */}
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-foreground">
              InfinityHub
            </Link>
            <h1 className="text-xl font-medium">Secure Checkout</h1>
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Address Selection */}
            <div className="lg:col-span-8">
              <div className="border-b border-border pb-4 mb-6">
                <h2 className="text-xl font-semibold">Select a delivery address</h2>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-sm">
                  Delivery addresses ({savedAddresses.length})
                </h3>

                <div className="space-y-4 mt-4">
                  {visibleAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={cn(
                        "flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                        selectedAddress === addr.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setSelectedAddress(addr.id)}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                        className="mt-1 w-4 h-4 text-primary"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{addr.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {addr.address}, {addr.city}, {addr.state}, {addr.zip}, {addr.country}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Phone number: {addr.phone}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <button className="text-primary hover:underline">
                            Edit address
                          </button>
                          <span className="text-muted-foreground">|</span>
                          <button className="text-primary hover:underline">
                            Add delivery instructions
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {savedAddresses.length > 3 && !showAllAddresses && (
                  <button
                    onClick={() => setShowAllAddresses(true)}
                    className="flex items-center gap-2 text-sm text-primary hover:underline mt-4"
                  >
                    Show more addresses
                    <ChevronDown className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                  className="text-sm text-primary hover:underline mt-4 block"
                >
                  + Add a new delivery address
                </button>

                {/* New Address Form */}
                {showNewAddressForm && (
                  <div className="mt-4 p-4 border border-border rounded-lg bg-card">
                    <h4 className="font-semibold mb-4">Add a new address</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="1234567890" />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="Street address, P.O. box" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="City" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="State" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="ZIP Code" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" placeholder="Country" defaultValue="USA" />
                      </div>
                    </div>
                    <Button
                      className="mt-4 bg-amber-400 hover:bg-amber-500 text-foreground"
                      onClick={() => setShowNewAddressForm(false)}
                    >
                      Use this address
                    </Button>
                  </div>
                )}

                <Button
                  className="mt-6 bg-amber-400 hover:bg-amber-500 text-foreground font-medium rounded-full px-8"
                  onClick={handleDeliverToAddress}
                  disabled={!selectedAddress}
                >
                  Deliver to this address
                </Button>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-4 border border-border rounded-lg p-4 space-y-4">
                <Button
                  className="w-full bg-amber-400 hover:bg-amber-500 text-foreground font-medium rounded-full"
                  onClick={handleDeliverToAddress}
                  disabled={!selectedAddress}
                >
                  Deliver to this address
                </Button>

                <div className="text-sm space-y-2 pt-4 border-t border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery:</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span>Order Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Payment Step View
  if (step === "payment") {
    const selectedAddr = savedAddresses.find(a => a.id === selectedAddress);

    return (
      <Layout>
        {/* Secure Checkout Header */}
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-foreground">
              InfinityHub
            </Link>
            <h1 className="text-xl font-medium">Secure Checkout</h1>
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Order Review */}
            <div className="lg:col-span-8 space-y-6">
              {/* Delivery Address */}
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Delivering to:</h3>
                  <button
                    className="text-sm text-primary hover:underline"
                    onClick={() => setStep("address")}
                  >
                    Change
                  </button>
                </div>
                {selectedAddr && (
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>
                      {selectedAddr.name}, {selectedAddr.address}, {selectedAddr.city}, {selectedAddr.state} {selectedAddr.zip}
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-4">Payment method</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:border-primary/50">
                    <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                    <span className="text-sm">Credit / Debit Card</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:border-primary/50">
                    <input type="radio" name="payment" className="w-4 h-4" />
                    <span className="text-sm">Net Banking</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:border-primary/50">
                    <input type="radio" name="payment" className="w-4 h-4" />
                    <span className="text-sm">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {/* Order Items */}
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-4">Review items and delivery</h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                        <p className="text-sm text-green-600">In Stock</p>
                        <p className="text-sm font-bold">${item.price.toFixed(2)} × {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-amber-400 hover:bg-amber-500 text-foreground font-medium rounded-full h-12 text-base"
                onClick={handlePlaceOrder}
              >
                Place your order
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By placing your order, you agree to InfinityHub's privacy notice and conditions of use.
              </p>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-4 border border-border rounded-lg p-4 space-y-4">
                <Button
                  className="w-full bg-amber-400 hover:bg-amber-500 text-foreground font-medium rounded-full"
                  onClick={handlePlaceOrder}
                >
                  Place your order
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By placing your order, you agree to our terms.
                </p>

                <div className="text-sm space-y-2 pt-4 border-t border-border">
                  <h4 className="font-semibold">Order Summary</h4>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery:</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border text-destructive">
                    <span>Order Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Cart View (default)
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
                  onClick={handleProceedToAddress}
                >
                  Proceed to Buy ({items.reduce((acc, item) => acc + item.quantity, 0)} items)
                </Button>
                <Button 
                  variant="outline"
                  className="w-full lg:w-auto rounded-full px-8"
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
            </div>
            
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
                    <h3 className="text-sm line-clamp-2 text-primary hover:underline mb-1">
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
                      <span className="text-xs bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded">
                        {discount}% off
                      </span>
                    )}
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Cart Section */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              </div>

              <div className="divide-y divide-border">
                {items.map((item) => {
                  const discount = item.originalPrice
                    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                    : 0;
                  const deliveryDate = new Date();
                  deliveryDate.setDate(deliveryDate.getDate() + 3);
                  const formattedDelivery = deliveryDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

                  return (
                    <div key={item.id} className="flex gap-4 p-4">
                      {/* Checkbox */}
                      <div className="flex items-start pt-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border" />
                      </div>

                      {/* Product Image */}
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 object-contain rounded bg-muted/30 p-2"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-medium text-foreground hover:text-primary line-clamp-2 text-base">
                            {item.name}
                          </h3>
                        </Link>

                        <p className="text-sm text-green-600 mt-1 font-medium">In Stock</p>

                        {/* Delivery Info */}
                        <div className="flex items-center gap-2 mt-1">
                          <Truck className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            FREE delivery <span className="font-medium text-foreground">{formattedDelivery}</span>
                          </span>
                        </div>

                        {/* Color & Size if available */}
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                          {item.colors && item.colors.length > 0 && (
                            <span>Colour: <span className="text-foreground">{item.colors[0].name}</span></span>
                          )}
                          {item.sizes && item.sizes.length > 0 && (
                            <span>Size: <span className="text-foreground">{item.sizes[0]}</span></span>
                          )}
                          <span>Category: <span className="text-foreground capitalize">{item.category}</span></span>
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center gap-3 mt-3 flex-wrap">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-border rounded-lg bg-muted/50 overflow-hidden">
                            <button
                              onClick={() => {
                                if (item.quantity === 1) {
                                  removeFromCart(item.id);
                                } else {
                                  updateQuantity(item.id, item.quantity - 1);
                                }
                              }}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-muted-foreground" /> : <Minus className="w-3 h-3" />}
                            </button>
                            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-muted-foreground/50">|</span>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-primary hover:underline"
                          >
                            Delete
                          </button>

                          <span className="text-muted-foreground/50">|</span>

                          <button className="text-sm text-primary hover:underline flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5" />
                            Save for later
                          </button>

                          <span className="text-muted-foreground/50 hidden sm:inline">|</span>

                          <button className="text-sm text-primary hover:underline hidden sm:inline">
                            See more like this
                          </button>

                          <span className="text-muted-foreground/50 hidden sm:inline">|</span>

                          <button className="text-sm text-primary hover:underline hidden sm:flex items-center gap-1">
                            <Share2 className="w-3.5 h-3.5" />
                            Share
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        {discount > 0 && (
                          <span className="inline-block bg-destructive text-destructive-foreground text-xs font-medium px-2 py-0.5 rounded mb-1">
                            -{discount}%
                          </span>
                        )}
                        <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
                        {item.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            M.R.P: ${item.originalPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-border text-right">
                <p className="text-lg">
                  Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items): 
                  <span className="font-bold ml-2">${totalPrice.toFixed(2)}</span>
                </p>
              </div>
            </div>
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

              <Button
                className="w-full bg-amber-400 hover:bg-amber-500 text-foreground font-medium rounded-full"
                onClick={handleProceedToAddress}
              >
                {isAuthenticated ? "Proceed to checkout" : "Sign in to checkout"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
