import { useState } from "react";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, X, Mic, Search, ShoppingCart, User, Globe, Heart, Star } from "lucide-react";
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

// Chat Input Component with aurora gradient focus effect
function ChatInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  return <div className="relative">
      {/* Glassy gray border - always visible */}
      <div className="absolute -inset-1.5 rounded-[40px] bg-muted/40 backdrop-blur-sm border border-border/50" />
      {/* Aurora gradient glow - only on focus */}
      <div className={`absolute -inset-[6px] rounded-[42px] blur-md transition-opacity duration-500 ${isFocused ? 'opacity-60' : 'opacity-0'}`} style={{
      background: 'conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)'
    }} />
      {/* Aurora gradient border - only on focus */}
      <div className={`absolute -inset-[2px] rounded-[38px] transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`} style={{
      background: 'conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)'
    }} />
      {/* Input container */}
      <div className="relative flex items-center bg-muted rounded-[36px] shadow-lg border border-border/30">
        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder="Ask anything..." className="flex-1 px-5 py-3 bg-transparent rounded-[36px] text-foreground placeholder:text-muted-foreground focus:outline-none text-sm" />
        {inputValue ? <button type="button" onClick={() => setInputValue("")} className="p-2 mr-2 rounded-full bg-[#0081CF] text-white transition-all hover:bg-[#006bb3] shadow-[0_0_15px_rgba(0,129,207,0.5)]">
            <X className="w-4 h-4" />
          </button> : <button type="button" className="p-2 mr-2 rounded-full bg-white transition-all">
            <Mic className="w-4 h-4 text-gray-500 opacity-70" />
          </button>}
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
              <div className="sticky top-2 bg-background rounded-3xl shadow-sm relative h-[calc(100vh-6rem)] flex flex-col">
                <button className="absolute top-3 right-3 z-10 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
                
                {/* Header */}
                <div className="p-6 pb-4 flex flex-col items-center text-center">
                  {/* AI Icon with sparkles */}
                  <div className="relative mb-2">
                    <span className="text-foreground tracking-tight text-4xl font-bold font-serif text-center">Ai</span>
                    {/* Sparkles */}
                    <svg className="absolute -top-1 -right-3 w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="url(#sparkle-gradient)" />
                      <path d="M19 14L19.75 16.25L22 17L19.75 17.75L19 20L18.25 17.75L16 17L18.25 16.25L19 14Z" fill="url(#sparkle-gradient-2)" />
                      <defs>
                        <linearGradient id="sparkle-gradient" x1="4" y1="2" x2="20" y2="18" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#0081CF" />
                          <stop offset="0.5" stopColor="#FFD700" />
                          <stop offset="1" stopColor="#9B59B6" />
                        </linearGradient>
                        <linearGradient id="sparkle-gradient-2" x1="16" y1="14" x2="22" y2="20" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#00ffbf" />
                          <stop offset="1" stopColor="#0081CF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-foreground">AI-Powered</h3>
                  <p className="text-xs text-muted-foreground">Shopping Experience</p>
                </div>

                {/* Chat Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-4">
                  
                </div>

                {/* Chat Input - Fixed at Bottom */}
                <div className="p-4 pt-3 mt-auto">
                  <ChatInput />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}