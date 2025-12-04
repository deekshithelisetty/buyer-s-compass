import { useState, useEffect, useRef, useCallback } from "react";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, X, Mic, Search, ShoppingCart, User, Globe, Heart, Star, Bot } from "lucide-react";
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
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const ITEMS_PER_LOAD = 10;
  
  const filteredProducts = products.filter(product => {
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setVisibleCount(prev => prev + ITEMS_PER_LOAD);
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);
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
              <div className="bg-background rounded-3xl p-6 shadow-sm animate-slide-up delay-200 h-[calc(100vh-6rem)] flex flex-col">
                {/* Filter Bar */}
                <div className="flex items-center justify-center gap-2 mb-6 flex-wrap flex-shrink-0">
                  {filterOptions.map(filter => <Button key={filter.label} variant="outline" size="sm" className="rounded-full bg-muted/50 hover:bg-muted gap-1 text-xs border-border/50">
                      {filter.label}
                      {filter.hasDropdown && <ChevronDown className="w-3 h-3" />}
                    </Button>)}
                </div>

                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                  <h2 className="font-semibold text-foreground font-sans capitalize text-base">{categoryFilter || searchQuery || "All Products"}</h2>
                  <button className="text-sm text-primary hover:underline flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Products Grid - Scrollable */}
                <div className="flex-1 overflow-y-auto pr-1 scrollbar-sleek">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {visibleProducts.map((product, index) => <ProductCardNew key={product.id} product={product} index={index} />)}
                  </div>

                  {/* Infinite scroll trigger */}
                  {hasMore && (
                    <div ref={loadMoreRef} className="flex justify-center py-6">
                      {isLoading && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          <span className="text-sm">Loading more...</span>
                        </div>
                      )}
                    </div>
                  )}

                  {!hasMore && filteredProducts.length > 0 && (
                    <div className="text-center py-4 text-sm text-muted-foreground">
                      All {filteredProducts.length} products loaded
                    </div>
                  )}

                  {filteredProducts.length === 0 && <div className="text-center py-16">
                      <p className="text-muted-foreground text-lg">No products found</p>
                      <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
                    </div>}
                </div>
              </div>
            </div>

            {/* AI Chat Panel */}
            {isChatOpen && (
              <div className="hidden lg:block w-[420px] flex-shrink-0 animate-slide-in-right">
                <div className="sticky top-2 bg-background rounded-3xl shadow-sm relative h-[calc(100vh-6rem)] flex flex-col">
                  <button 
                    onClick={() => setIsChatOpen(false)}
                    className="absolute top-3 right-3 z-10 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  {/* Header */}
                  <div className="p-4 pb-3 flex flex-col items-center text-center">
                    {/* AI Icon with sparkles and glow */}
                    <div className="relative mb-0 pt-1 pb-2 px-6">
                      {/* Glow effect behind Ai text */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 blur-2xl opacity-60 animate-[pulse_3s_ease-in-out_infinite]" style={{
                        background: 'conic-gradient(from 0deg, #0081CF, #00ffbf, #FFD700, #FF6FD8, #9B59B6, #0081CF)'
                      }} />
                      <span className="relative z-10 text-4xl font-bold font-serif text-center bg-clip-text text-transparent" style={{
                        backgroundImage: 'linear-gradient(180deg, #00D4AA 0%, #0081CF 50%, #9B59B6 100%)'
                      }}>Ai</span>
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
                    <h3 className="font-medium text-foreground text-base font-sans">AI-Powered</h3>
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
            )}
          </div>
        </div>

        {/* Floating Chat Button */}
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 z-50 group transition-transform hover:scale-110 animate-fade-in"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full blur-2xl opacity-70 animate-[pulse_2s_ease-in-out_infinite]" style={{
              background: 'linear-gradient(135deg, #0081CF, #9B59B6, #00D4AA, #FF6B6B)'
            }} />
            
            {/* Custom 3D AI Chatbot Icon */}
            <svg className="w-20 h-20 relative z-10" viewBox="0 0 80 80" fill="none" style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}>
              <defs>
                {/* Main body gradient */}
                <linearGradient id="robotBody" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="50%" stopColor="#764ba2" />
                  <stop offset="100%" stopColor="#0081CF" />
                </linearGradient>
                {/* Metallic highlight */}
                <linearGradient id="metalHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
                </linearGradient>
                {/* Screen glow */}
                <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ffbf" />
                  <stop offset="100%" stopColor="#0081CF" />
                </linearGradient>
                {/* Antenna glow */}
                <radialGradient id="antennaGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="100%" stopColor="#9B59B6" />
                </radialGradient>
                {/* Shadow gradient */}
                <linearGradient id="shadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1a1a2e" />
                  <stop offset="100%" stopColor="#0d0d1a" />
                </linearGradient>
                {/* Eye glow filter */}
                <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Outer glow ring */}
              <circle cx="40" cy="40" r="38" fill="none" stroke="url(#screenGlow)" strokeWidth="1.5" opacity="0.5" />
              
              {/* Main robot head - 3D effect with multiple layers */}
              <ellipse cx="40" cy="42" rx="26" ry="24" fill="url(#shadowGrad)" /> {/* Shadow layer */}
              <ellipse cx="40" cy="40" rx="26" ry="24" fill="url(#robotBody)" />
              <ellipse cx="40" cy="40" rx="26" ry="24" fill="url(#metalHighlight)" />
              
              {/* Ear panels - left */}
              <rect x="8" y="32" width="8" height="16" rx="3" fill="url(#robotBody)" />
              <rect x="8" y="32" width="8" height="16" rx="3" fill="url(#metalHighlight)" />
              <rect x="10" y="36" width="4" height="8" rx="2" fill="url(#screenGlow)" opacity="0.8" />
              
              {/* Ear panels - right */}
              <rect x="64" y="32" width="8" height="16" rx="3" fill="url(#robotBody)" />
              <rect x="64" y="32" width="8" height="16" rx="3" fill="url(#metalHighlight)" />
              <rect x="66" y="36" width="4" height="8" rx="2" fill="url(#screenGlow)" opacity="0.8" />
              
              {/* Antenna base */}
              <rect x="36" y="12" width="8" height="6" rx="2" fill="url(#robotBody)" />
              <rect x="36" y="12" width="8" height="6" rx="2" fill="url(#metalHighlight)" />
              
              {/* Antenna ball with glow */}
              <circle cx="40" cy="8" r="5" fill="url(#antennaGlow)" />
              <circle cx="40" cy="8" r="3" fill="#ffffff" opacity="0.5" />
              <circle cx="38" cy="6" r="1.5" fill="#ffffff" opacity="0.8" />
              
              {/* Face visor/screen area */}
              <rect x="22" y="30" width="36" height="18" rx="6" fill="#0d0d1a" opacity="0.9" />
              <rect x="23" y="31" width="34" height="16" rx="5" fill="none" stroke="url(#screenGlow)" strokeWidth="1" opacity="0.6" />
              
              {/* Eyes with glow */}
              <g filter="url(#eyeGlow)">
                <circle cx="32" cy="39" r="5" fill="url(#screenGlow)" />
                <circle cx="48" cy="39" r="5" fill="url(#screenGlow)" />
              </g>
              {/* Eye pupils */}
              <circle cx="33" cy="38" r="2" fill="#ffffff" opacity="0.9" />
              <circle cx="49" cy="38" r="2" fill="#ffffff" opacity="0.9" />
              
              {/* Mouth - LED strip style */}
              <rect x="34" y="52" width="12" height="3" rx="1.5" fill="url(#screenGlow)" opacity="0.9" />
              <rect x="35" y="52.5" width="2" height="2" rx="0.5" fill="#ffffff" opacity="0.6" />
              <rect x="39" y="52.5" width="2" height="2" rx="0.5" fill="#ffffff" opacity="0.6" />
              <rect x="43" y="52.5" width="2" height="2" rx="0.5" fill="#ffffff" opacity="0.6" />
              
              {/* Circuit pattern details */}
              <path d="M20 45 L18 45 L18 50" stroke="url(#screenGlow)" strokeWidth="1" fill="none" opacity="0.4" />
              <path d="M60 45 L62 45 L62 50" stroke="url(#screenGlow)" strokeWidth="1" fill="none" opacity="0.4" />
              <circle cx="18" cy="50" r="1.5" fill="url(#screenGlow)" opacity="0.4" />
              <circle cx="62" cy="50" r="1.5" fill="url(#screenGlow)" opacity="0.4" />
              
              {/* Highlight shine */}
              <ellipse cx="30" cy="28" rx="10" ry="4" fill="#ffffff" opacity="0.15" />
            </svg>
          </button>
        )}
      </div>
    </div>;
}