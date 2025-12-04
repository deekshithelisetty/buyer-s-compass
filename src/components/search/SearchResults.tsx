import { useState } from "react";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Sparkles, X, Mic, Search, ShoppingCart, User, Globe, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types/product";
interface SearchResultsProps {
  searchQuery?: string;
  categoryFilter?: string;
}

// Product Card Component matching the reference design
function ProductCardNew({
  product,
  index
}: {
  product: Product;
  index: number;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  return <div className="group cursor-pointer animate-slide-up" style={{
    animationDelay: `${index % 10 * 50 + 200}ms`
  }} onClick={() => navigate(`/product/${product.id}`)}>
      {/* Image Container */}
      <div className="relative bg-muted/30 rounded-2xl p-3 mb-2 aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" />
        {/* Heart Icon */}
        <button onClick={e => {
        e.stopPropagation();
        setIsLiked(!isLiked);
      }} className="absolute top-3 right-3 p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
        </button>
      </div>

      {/* Product Info */}
      <div className="px-1">
        <h3 className="text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors font-sans font-normal text-xs text-left">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} />)}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-semibold text-foreground">
            {product.price.toFixed(2)} <span className="text-xs text-muted-foreground">AED</span>
          </span>
          {product.originalPrice && <span className="text-xs text-muted-foreground line-through">
              {product.originalPrice.toFixed(2)}
            </span>}
        </div>
      </div>
    </div>;
}
export function SearchResults({
  searchQuery,
  categoryFilter
}: SearchResultsProps) {
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "");
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const filteredProducts = products.filter(product => {
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(localSearchQuery.trim())}`);
    }
  };
  const filterOptions = [{
    label: "Category",
    hasDropdown: true
  }, {
    label: "Rating",
    hasDropdown: true
  }, {
    label: "Gender",
    hasDropdown: true
  }, {
    label: "Size",
    hasDropdown: true
  }, {
    label: "Color",
    hasDropdown: true
  }, {
    label: "Price",
    hasDropdown: true
  }, {
    label: "Sort by",
    hasDropdown: true
  }];
  return <div className="min-h-screen bg-muted/30 px-7 py-2 animate-zoom-in">
      <div className="bg-muted rounded-3xl min-h-[calc(100vh-1rem)] overflow-hidden shadow-xl">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/30 rounded-t-3xl">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
            {/* Logo */}
            <button onClick={() => navigate("/")} className="flex-shrink-0">
              <img src="/images/infinityhub-logo.png" alt="InfinityHub" className="h-9 w-auto" />
            </button>

            {/* Search Bar - Centered */}
            <form onSubmit={handleSearch} className="flex-1 max-w-lg">
              <div className="relative">
                {/* Glassy gray border - always visible */}
                <div className="absolute -inset-2 rounded-[50px] bg-muted/40 backdrop-blur-sm border border-border/50" />
                {/* Aurora gradient glow - only on focus */}
                <div className={`absolute -inset-[8px] rounded-[52px] blur-md transition-opacity duration-500 ${isFocused ? 'opacity-60' : 'opacity-0'}`} style={{
                background: 'conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)'
              }} />
                {/* Aurora gradient border - only on focus */}
                <div className={`absolute -inset-[3px] rounded-[47px] transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`} style={{
                background: 'conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)'
              }} />
                {/* Search input container */}
                <div className="relative flex items-center bg-muted rounded-[45px] shadow-lg border border-border/30">
                  <input type="text" value={localSearchQuery} onChange={e => setLocalSearchQuery(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder={searchQuery || "Ask anything..."} className="flex-1 px-6 py-3 bg-transparent rounded-[45px] text-foreground placeholder:text-muted-foreground focus:outline-none text-sm" />
                  {localSearchQuery ? <button type="button" onClick={() => setLocalSearchQuery("")} className="p-2.5 mr-2 rounded-full bg-[#0081CF] text-white transition-all hover:bg-[#006bb3] shadow-[0_0_15px_rgba(0,129,207,0.5)]">
                      <X className="w-4 h-4" />
                    </button> : <button type="button" className="p-2.5 mr-2 rounded-full bg-white transition-all">
                      <Mic className="w-4 h-4 text-gray-500 opacity-70" />
                    </button>}
                </div>
              </div>
            </form>

            {/* Right section */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="w-4 h-4" />
                <span>AE</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-[1800px] mx-auto pl-2 pr-2 pt-2 pb-6">
          <div className="flex gap-2">
            {/* Main Content */}
            <div className="flex-1">
              {/* Results Section with Filters */}
              <div className="bg-background rounded-3xl p-6 shadow-sm animate-slide-up delay-200">
                {/* Filter Bar */}
                <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
                  {filterOptions.map(filter => <Button key={filter.label} variant="outline" size="sm" className="rounded-full bg-muted/50 hover:bg-muted gap-1 text-xs border-border/50">
                      {filter.label}
                      {filter.hasDropdown && <ChevronDown className="w-3 h-3" />}
                    </Button>)}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-foreground font-sans capitalize text-base">{categoryFilter || searchQuery || "All Products"}</h2>
                  <button className="text-sm text-primary hover:underline flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredProducts.map((product, index) => <ProductCardNew key={product.id} product={product} index={index} />)}
                </div>

                {filteredProducts.length === 0 && <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg">No products found</p>
                    <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
                  </div>}
              </div>
            </div>

            {/* AI Chat Panel */}
            <div className="hidden lg:block w-[420px] flex-shrink-0 animate-slide-in-right delay-300">
              <div className="sticky top-2 bg-background rounded-3xl pt-2 pl-2 pr-2 pb-6 shadow-sm relative">
                <button className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI-Powered</h3>
                    <p className="text-xs text-muted-foreground">Shopping Experience</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-muted/50 border border-border/30 text-sm text-muted-foreground hover:bg-muted transition-colors">
                    {searchQuery || categoryFilter || "Colorful products"}
                  </button>
                </div>

                <div className="bg-muted/30 rounded-xl p-3 mb-4">
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

                <div className="relative">
                  <input type="text" placeholder="Ask anything..." className="w-full px-4 py-2.5 pr-10 rounded-full bg-muted/50 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-primary/10 text-primary">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}