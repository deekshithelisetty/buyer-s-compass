import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
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

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pincode, setPincode] = useState("10001");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main Header */}
      <div className="bg-header text-header-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-xl font-bold hidden sm:block">ShopHub</span>
            </Link>

            {/* Pincode Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="header" size="sm" className="hidden md:flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs">
                    <span className="block text-muted-foreground/80">Deliver to</span>
                    <span className="font-semibold">{pincode}</span>
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <div className="p-2">
                  <label className="text-xs text-muted-foreground">Enter Pincode</label>
                  <Input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter pincode"
                    className="mt-1"
                  />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products, brands and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 h-11 bg-background text-foreground rounded-lg border-0 focus-visible:ring-2 focus-visible:ring-primary"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Auth Button */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="header" size="sm" className="hidden sm:flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Hi, {user?.name}</span>
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>My Account</DropdownMenuItem>
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="header"
                  size="sm"
                  onClick={() => navigate("/auth")}
                  className="hidden sm:flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">Sign In</span>
                </Button>
              )}

              {/* Cart Button */}
              <Button
                variant="header"
                size="sm"
                onClick={() => navigate("/checkout")}
                className="flex items-center gap-2 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center animate-scale-in">
                    {totalItems}
                  </span>
                )}
                <span className="text-sm hidden sm:inline">Cart</span>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="header"
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
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 h-10 bg-background text-foreground rounded-lg"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Categories Navigation */}
      <nav className="bg-card border-b border-border overflow-x-auto">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1 py-2 min-w-max">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/?category=${category.id}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[120px] bg-background z-40 md:hidden animate-fade-in">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4">
              {/* Pincode */}
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Deliver to</p>
                  <Input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="h-8 mt-1"
                  />
                </div>
              </div>

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
