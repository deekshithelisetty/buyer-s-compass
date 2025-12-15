import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Sparkles, Globe, ChevronDown, Minus, Plus, Trash2, Heart, Share2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { categories } from "@/data/products";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img 
              src="/images/infinityhub-logo.png" 
              alt="InfinityHub" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Search Bar - Center */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200 via-orange-200 to-rose-200 dark:from-amber-500/30 dark:via-orange-500/30 dark:to-rose-500/30 rounded-full blur-[1px]" />
              <div className="relative flex items-center bg-card rounded-full border border-border/50 overflow-hidden">
                <Sparkles className="w-4 h-4 text-amber-500 ml-4" />
                <input
                  type="text"
                  placeholder="Search products, brands and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Country Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1.5 text-foreground">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">EN</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English (EN)</DropdownMenuItem>
                <DropdownMenuItem>العربية (AR)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart Button with Popover */}
            <Popover open={isCartOpen} onOpenChange={setIsCartOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1.5 relative text-foreground"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 left-3 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                  <span className="text-sm font-medium hidden sm:inline">Cart</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[420px] p-0" align="end">
                {items.length === 0 ? (
                  <div className="p-6 text-center">
                    <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                    <Button 
                      className="mt-4" 
                      onClick={() => { setIsCartOpen(false); navigate("/"); }}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="max-h-[70vh] flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-border">
                      <h3 className="text-lg font-semibold">Shopping Cart</h3>
                    </div>

                    {/* Cart Items - Scrollable */}
                    <div className="flex-1 overflow-y-auto divide-y divide-border max-h-[350px]">
                      {items.map((item) => {
                        const discount = item.originalPrice
                          ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                          : 0;
                        const deliveryDate = new Date();
                        deliveryDate.setDate(deliveryDate.getDate() + 3);
                        const formattedDelivery = deliveryDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

                        return (
                          <div key={item.id} className="flex gap-3 p-4">
                            {/* Checkbox */}
                            <div className="flex items-start pt-1">
                              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border" />
                            </div>

                            {/* Product Image */}
                            <Link 
                              to={`/product/${item.id}`} 
                              onClick={() => setIsCartOpen(false)}
                              className="flex-shrink-0"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-contain rounded bg-amber-100 p-1"
                              />
                            </Link>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <Link 
                                to={`/product/${item.id}`}
                                onClick={() => setIsCartOpen(false)}
                              >
                                <h4 className="text-sm font-medium text-foreground hover:text-primary line-clamp-1">
                                  {item.name}
                                </h4>
                              </Link>

                              <p className="text-xs text-green-600 mt-0.5 font-medium">In Stock</p>

                              {/* Delivery Info */}
                              <div className="flex items-center gap-1 mt-0.5">
                                <Truck className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  FREE delivery <span className="font-medium text-foreground">{formattedDelivery}</span>
                                </span>
                              </div>

                              {/* Color & Category */}
                              <div className="flex flex-wrap gap-2 mt-1 text-xs text-muted-foreground">
                                {item.colors && item.colors.length > 0 && (
                                  <span>Colour: <span className="text-foreground">{item.colors[0].name}</span></span>
                                )}
                                <span>Category: <span className="text-foreground capitalize">{item.category}</span></span>
                              </div>

                              {/* Actions Row */}
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                {/* Quantity Controls */}
                                <div className="flex items-center border border-border rounded bg-muted/50 overflow-hidden">
                                  <button
                                    onClick={() => {
                                      if (item.quantity === 1) {
                                        removeFromCart(item.id);
                                      } else {
                                        updateQuantity(item.id, item.quantity - 1);
                                      }
                                    }}
                                    className="w-6 h-6 flex items-center justify-center hover:bg-muted transition-colors"
                                  >
                                    {item.quantity === 1 ? <Trash2 className="w-3 h-3 text-muted-foreground" /> : <Minus className="w-2.5 h-2.5" />}
                                  </button>
                                  <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-6 h-6 flex items-center justify-center hover:bg-muted transition-colors"
                                  >
                                    <Plus className="w-2.5 h-2.5" />
                                  </button>
                                </div>

                                <span className="text-muted-foreground/50">|</span>

                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-xs text-primary hover:underline"
                                >
                                  Delete
                                </button>

                                <span className="text-muted-foreground/50">|</span>

                                <button className="text-xs text-primary hover:underline flex items-center gap-0.5">
                                  <Heart className="w-3 h-3" />
                                  Save for later
                                </button>
                              </div>

                              {/* Second row actions */}
                              <div className="flex items-center gap-2 mt-1">
                                <button className="text-xs text-primary hover:underline">
                                  See more like this
                                </button>
                                <span className="text-muted-foreground/50">|</span>
                                <button className="text-xs text-primary hover:underline flex items-center gap-0.5">
                                  <Share2 className="w-3 h-3" />
                                  Share
                                </button>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right flex-shrink-0">
                              {discount > 0 && (
                                <span className="inline-block bg-destructive text-destructive-foreground text-[10px] font-medium px-1.5 py-0.5 rounded mb-1">
                                  -{discount}%
                                </span>
                              )}
                              <p className="text-base font-bold">${item.price.toFixed(2)}</p>
                              {item.originalPrice && (
                                <p className="text-xs text-muted-foreground line-through">
                                  M.R.P: ${item.originalPrice.toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-border bg-muted/30">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">
                          Subtotal ({totalItems} items):
                        </span>
                        <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
                      </div>
                      <Button
                        className="w-full bg-amber-400 hover:bg-amber-500 text-foreground font-medium rounded-full"
                        onClick={() => {
                          setIsCartOpen(false);
                          if (isAuthenticated) {
                            navigate("/checkout?step=address");
                          } else {
                            navigate("/auth?redirect=/checkout?step=address");
                          }
                        }}
                      >
                        Proceed to Buy ({totalItems} items)
                      </Button>
                    </div>
                  </div>
                )}
              </PopoverContent>
            </Popover>

            {/* Auth Button */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1.5 text-foreground">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/orders")}>My Orders</DropdownMenuItem>
                  <DropdownMenuItem>My Account</DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/auth")}
                className="hidden sm:flex items-center gap-1.5 text-foreground"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Sign In</span>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="pb-3 md:hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200 via-orange-200 to-rose-200 dark:from-amber-500/30 dark:via-orange-500/30 dark:to-rose-500/30 rounded-full blur-[1px]" />
            <div className="relative flex items-center bg-card rounded-full border border-border/50 overflow-hidden">
              <Sparkles className="w-4 h-4 text-amber-500 ml-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Categories Navigation - Gradient Style */}
      <nav className="bg-card border-t border-border/50 overflow-x-auto">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 py-3 min-w-max">
            {categories.map((category, index) => {
              const gradients = [
                { from: '#a955ff', to: '#ea51ff' }, // Electronics - purple
                { from: '#56CCF2', to: '#2F80ED' }, // Fashion - blue
                { from: '#FF9966', to: '#FF5E62' }, // Home - orange
                { from: '#80FF72', to: '#7EE8FA' }, // Sports - green
                { from: '#FFD93D', to: '#FF9F43' }, // Books - yellow
                { from: '#ffa9c6', to: '#f434e2' }, // Beauty - pink
                { from: '#6366f1', to: '#8b5cf6' }, // Toys - indigo
                { from: '#22c55e', to: '#84cc16' }, // Grocery - green
                { from: '#ef4444', to: '#f97316' }, // Automotive - red
                { from: '#ec4899', to: '#a855f7' }, // Jewelry - magenta
                { from: '#f59e0b', to: '#eab308' }, // Pets - amber
                { from: '#14b8a6', to: '#06b6d4' }, // Health - teal
              ];
              const gradient = gradients[index % gradients.length];
              
              return (
                <li key={category.id}>
                  <Link
                    to={`/?category=${category.id}`}
                    style={{ '--gradient-from': gradient.from, '--gradient-to': gradient.to } as React.CSSProperties}
                    className="group relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:text-white rounded-full"
                  >
                    {/* Gradient background on hover */}
                    <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    {/* Blur glow on hover */}
                    <span className="absolute top-[5px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[10px] opacity-0 -z-10 transition-all duration-300 group-hover:opacity-40" />
                    
                    <span className="relative z-10 text-lg">{category.icon}</span>
                    <span className="relative z-10">{category.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[100px] bg-background z-40 md:hidden animate-fade-in">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4">
              {/* Auth */}
              {!isAuthenticated && (
                <Button onClick={() => { navigate("/auth"); setIsMobileMenuOpen(false); }} className="w-full">
                  Sign In / Sign Up
                </Button>
              )}

              {/* Categories */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground">Categories</p>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/?category=${category.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
