import { useState } from "react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, X, Mic, Search, ShoppingCart, User, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchResultsProps {
  searchQuery?: string;
  categoryFilter?: string;
}

export function SearchResults({ searchQuery, categoryFilter }: SearchResultsProps) {
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "");
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(localSearchQuery.trim())}`);
    }
  };

  const filterOptions = [
    { label: "Category", hasDropdown: true },
    { label: "Rating", hasDropdown: true },
    { label: "Price", hasDropdown: true },
    { label: "Sort by", hasDropdown: true },
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-4 animate-zoom-in">
      <div className="bg-background rounded-3xl min-h-[calc(100vh-2rem)] overflow-hidden shadow-xl">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/30 rounded-t-3xl">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
            {/* Logo */}
            <button onClick={() => navigate("/")} className="flex-shrink-0">
              <img 
                src="/images/infinityhub-logo.png" 
                alt="InfinityHub" 
                className="h-9 w-auto"
              />
            </button>

            {/* Search Bar - Centered */}
            <form onSubmit={handleSearch} className="flex-1 max-w-lg">
              <div className="relative">
                {/* Glassy border - always visible */}
                <div className="absolute -inset-1.5 rounded-full bg-muted/30 backdrop-blur-sm border border-border/40" />
                {/* Aurora glow on focus */}
                <div 
                  className={`absolute -inset-[7px] rounded-full blur-md transition-opacity duration-500 ${isFocused ? 'opacity-50' : 'opacity-0'}`}
                  style={{ background: 'conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)' }}
                />
                <div 
                  className={`absolute -inset-[2px] rounded-full transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`}
                  style={{ background: 'conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)' }}
                />
                <div className="relative flex items-center bg-muted/50 rounded-full border border-border/20">
                  <Search className="w-4 h-4 ml-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={searchQuery || "Search products..."}
                    className="flex-1 px-3 py-2.5 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
                  />
                  {localSearchQuery && (
                    <button 
                      type="button" 
                      onClick={() => setLocalSearchQuery("")}
                      className="p-1.5 mr-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Right section */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Currency/Region */}
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="w-4 h-4" />
                <span>AE</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {/* Cart */}
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
              </button>
              
              {/* Sign In */}
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Filter Bar */}
          <div className="flex items-center gap-2 mb-6 flex-wrap animate-slide-up delay-100">
            {filterOptions.map((filter) => (
              <Button
                key={filter.label}
                variant="outline"
                size="sm"
                className="rounded-full bg-card hover:bg-muted gap-1"
              >
                {filter.label}
                {filter.hasDropdown && <ChevronDown className="w-3 h-3" />}
              </Button>
            ))}
          </div>

          <div className="flex gap-6">
            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-4 animate-slide-up delay-200">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {searchQuery ? `Results for "${searchQuery}"` : categoryFilter ? `${categories.find(c => c.id === categoryFilter)?.name || categoryFilter}` : "All Products"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredProducts.length} products found
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All →
                </Button>
              </div>

              {/* Products */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-slide-up"
                    style={{ animationDelay: `${(index % 10) * 50 + 200}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No products found</p>
                  <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </div>

            {/* AI Chat Panel */}
            <div className="hidden lg:block w-80 flex-shrink-0 animate-slide-in-right delay-300">
              <div className="sticky top-24 bg-gradient-to-br from-card to-muted/50 rounded-2xl border border-border/50 p-5 shadow-lg relative">
                {/* Close button */}
                <button className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
                
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI-Powered</h3>
                    <p className="text-xs text-muted-foreground">Shopping Experience</p>
                  </div>
                </div>

                {/* Suggestion chips */}
                <div className="space-y-2 mb-4">
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-background/50 border border-border/30 text-sm text-muted-foreground hover:bg-background transition-colors">
                    {searchQuery || "Colorful products"}
                  </button>
                </div>

                {/* Chat preview */}
                <div className="bg-background/50 rounded-xl p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Absolutely!</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        We have a variety of {categoryFilter || "products"} for you...
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask anything..."
                    className="w-full px-4 py-2.5 pr-10 rounded-full bg-background border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-primary/10 text-primary">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
