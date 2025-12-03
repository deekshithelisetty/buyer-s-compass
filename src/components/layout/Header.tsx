import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Sparkles, Globe, ChevronDown } from "lucide-react";
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
            <span className="text-xl font-bold text-foreground tracking-tight">
              Shop<span className="text-primary">Hub</span>
            </span>
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

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/checkout")}
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
                  <DropdownMenuItem>My Account</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
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

      {/* Categories Navigation */}
      <nav className="bg-card border-t border-border/50 overflow-x-auto">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1 py-1.5 min-w-max">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/?category=${category.id}`}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-200"
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
