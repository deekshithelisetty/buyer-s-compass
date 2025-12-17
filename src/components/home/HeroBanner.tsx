import { useState } from "react";
import { ArrowRight, Mic, ShoppingCart, User, MapPin, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { categories } from "@/data/products";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Row 1 - Electronics, watches, headphones, mobiles
const row1Images = [
  "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400", // TV
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400", // Mobile phone
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", // Headphones
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", // Red sneaker
  "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400", // iPhone
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400", // Smart watch
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400", // Perfume
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400", // Sneaker
];

// Row 2 - Fashion, women, accessories
const row2Images = [
  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400", // Women's fashion
  "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400", // Women's bag
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400", // Woman shopping
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400", // Cream jar
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400", // Women's clothes
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400", // Jacket
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", // Backpack
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", // Sunglasses
];

// Row 3 - Kids girls collection and electronic accessories
const row3Images = [
  "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400", // Girl in pink dress
  "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400", // Girls fashion
  "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400", // Kids shoes
  "https://images.unsplash.com/photo-1588099768531-a72d4a198538?w=400", // Girls outfit
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400", // Camera
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400", // Headphones accessory
  "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400", // USB cables
  "https://images.unsplash.com/photo-1610438235354-a6ae5528385c?w=400", // Keyboard
];

const categoryGradients = [
  { from: '#a955ff', to: '#ea51ff' },
  { from: '#56CCF2', to: '#2F80ED' },
  { from: '#FF9966', to: '#FF5E62' },
  { from: '#80FF72', to: '#7EE8FA' },
  { from: '#FFD93D', to: '#FF9F43' },
  { from: '#ffa9c6', to: '#f434e2' },
  { from: '#6366f1', to: '#8b5cf6' },
  { from: '#22c55e', to: '#84cc16' },
  { from: '#ef4444', to: '#f97316' },
  { from: '#ec4899', to: '#a855f7' },
  { from: '#f59e0b', to: '#eab308' },
  { from: '#14b8a6', to: '#06b6d4' },
];

interface HeroBannerProps {
  isFullScreen?: boolean;
}

export function HeroBanner({
  isFullScreen = false
}: HeroBannerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [pincode, setPincode] = useState("123456");
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeOpen, setPincodeOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const containerHeight = isFullScreen ? "h-full" : "h-[280px] md:h-[320px]";
  const cardSize = isFullScreen ? 'w-36 h-36 md:w-44 md:h-44' : 'w-20 h-20 md:w-24 md:h-24';

  return (
    <section className={`relative ${containerHeight} overflow-hidden bg-background flex flex-col`}>
      {/* Header */}
      {isFullScreen && (
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/30">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center gap-6">
              {/* Brand Name with Gradient */}
              <button className="flex-shrink-0">
                <span 
                  className="text-2xl font-bold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  InfinityHub
                </span>
              </button>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex-1 flex justify-center">
                <div className="relative w-full max-w-2xl">
                  <div className="absolute -inset-2 rounded-[50px] bg-muted/40 backdrop-blur-sm border border-border/50" />
                  <div className={`absolute -inset-[8px] rounded-[52px] blur-md transition-opacity duration-500 ${isFocused ? 'opacity-60' : 'opacity-0'}`} style={{
                    background: 'conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)'
                  }} />
                  <div className={`absolute -inset-[3px] rounded-[47px] transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`} style={{
                    background: 'conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)'
                  }} />
                  <div className="relative flex items-center bg-muted rounded-[45px] shadow-lg border border-border/30">
                    <input 
                      type="text" 
                      value={searchQuery} 
                      onChange={e => setSearchQuery(e.target.value)} 
                      onFocus={() => setIsFocused(true)} 
                      onBlur={() => setIsFocused(false)} 
                      placeholder="Ask anything..." 
                      className="flex-1 px-6 py-3 bg-transparent rounded-[45px] text-foreground placeholder:text-muted-foreground focus:outline-none text-sm" 
                    />
                    {searchQuery.trim() ? (
                      <button type="submit" className="p-2.5 mr-2 rounded-full bg-[#0081CF] text-white transition-all hover:bg-[#006bb3] shadow-[0_0_15px_rgba(0,129,207,0.5)]">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button type="button" className="p-2.5 mr-2 rounded-full bg-white transition-all">
                        <Mic className="w-4 h-4 text-gray-500 opacity-70" />
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* Right section */}
              <div className="flex items-center gap-4 flex-shrink-0">
                {/* Pincode */}
                <Popover open={pincodeOpen} onOpenChange={setPincodeOpen}>
                  <PopoverTrigger asChild>
                    <div className="flex items-center gap-2 px-4 py-2 min-w-[140px] bg-muted/50 rounded-full border border-border/50 hover:bg-muted transition-colors cursor-pointer">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div className="text-left">
                        <p className="text-[10px] text-muted-foreground leading-none">Deliver to</p>
                        <p className="text-xs font-medium text-foreground">{pincode}</p>
                      </div>
                      <ChevronDown className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-3 bg-background border border-border shadow-lg z-50" align="start">
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-foreground">Enter your pincode</p>
                      <Input
                        type="text"
                        placeholder="Enter pincode"
                        value={pincodeInput}
                        onChange={(e) => setPincodeInput(e.target.value)}
                        className="h-9"
                        maxLength={6}
                      />
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          if (pincodeInput.trim()) {
                            setPincode(pincodeInput.trim());
                            setPincodeOpen(false);
                            setPincodeInput("");
                          }
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
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
          </div>
        </header>
      )}

      {/* Categories Navigation - Animated Gradient Style */}
      {isFullScreen && (
        <nav className="bg-card/95 backdrop-blur-md border-b border-border/30 overflow-x-auto z-40">
          <div className="max-w-7xl mx-auto px-6">
            <ul className="flex items-center justify-center gap-3 py-2 min-w-max">
              {categories.map((category, index) => {
                const gradient = categoryGradients[index % categoryGradients.length];
                return (
                  <li key={category.id}>
                    <button
                      onClick={() => navigate(`/?category=${category.id}`)}
                      style={{ '--gradient-from': gradient.from, '--gradient-to': gradient.to } as React.CSSProperties}
                      className="relative w-[40px] h-[40px] bg-card shadow-md rounded-full flex items-center justify-center transition-all duration-500 hover:w-[120px] hover:shadow-none group cursor-pointer border border-border/50"
                    >
                      <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100" />
                      <span className="absolute top-[6px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[10px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-50" />
                      <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0">
                        <span className="text-base text-muted-foreground">{category.icon}</span>
                      </span>
                      <span className="absolute text-white uppercase tracking-wide text-[10px] font-semibold transition-all duration-500 scale-0 group-hover:scale-100 delay-150 whitespace-nowrap">
                        {category.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      )}

      {/* Animated Background Grid - Three evenly spaced rows */}
      <div className="absolute inset-0 flex flex-col justify-between py-4" style={{ top: isFullScreen ? '120px' : '0' }}>
        {/* Top Row - Moving Left */}
        <div className="flex gap-3 animate-scroll-left">
          {[...row1Images, ...row1Images].map((img, i) => (
            <div key={`top-${i}`} className={`flex-shrink-0 ${cardSize} rounded-2xl overflow-hidden bg-card shadow-lg`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Middle Row - Moving Right */}
        <div className="flex gap-3 animate-scroll-right">
          {[...row2Images, ...row2Images].map((img, i) => (
            <div key={`middle-${i}`} className={`flex-shrink-0 ${cardSize} rounded-2xl overflow-hidden bg-card shadow-lg`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Bottom Row - Moving Left */}
        <div className="flex gap-3 animate-scroll-left" style={{ animationDelay: '-10s' }}>
          {[...row3Images, ...row3Images].map((img, i) => (
            <div key={`bottom-${i}`} className={`flex-shrink-0 ${cardSize} rounded-2xl overflow-hidden bg-card shadow-lg`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Center Content - Floating overlay */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ marginTop: isFullScreen ? '50px' : '-70px' }}>
        <div className="relative flex flex-col items-center justify-center w-full max-w-[800px] px-4">
          {/* Fog/Blur background */}
          <div className={`absolute ${isFullScreen ? 'w-[750px] h-[400px]' : 'w-[550px] h-[280px]'} bg-background/60 rounded-[50%]`} style={{ filter: 'blur(80px)', zIndex: 1 }} />
          <div className={`absolute ${isFullScreen ? 'w-[650px] h-[350px]' : 'w-[450px] h-[230px]'} bg-background/50 rounded-[50%]`} style={{ filter: 'blur(50px)', zIndex: 1 }} />
          <div className={`absolute ${isFullScreen ? 'w-[550px] h-[300px]' : 'w-[380px] h-[180px]'} bg-background/50 rounded-[50%]`} style={{ filter: 'blur(30px)', zIndex: 1 }} />
          
          {/* Logo for full screen */}
          {isFullScreen && (
            <div className="text-center -mb-2 relative z-10">
              <img src="/images/infinityhub-logo.png" alt="InfinityHub - Endless Choices" className="h-36 md:h-36 w-auto mx-auto shadow-none" />
            </div>
          )}

          {/* Search Bar with rainbow gradient glow - only show on non-fullscreen or hide when header has it */}
          {!isFullScreen && (
            <form onSubmit={handleSearch} className="w-full max-w-lg relative z-10">
              <div className="relative">
                <div className="absolute -inset-2 rounded-[50px] bg-muted/40 backdrop-blur-sm border border-border/50" />
                <div className={`absolute -inset-[8px] rounded-[52px] blur-md transition-opacity duration-500 ${isFocused ? 'opacity-60' : 'opacity-0'}`} style={{
                  background: 'conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)'
                }} />
                <div className={`absolute -inset-[3px] rounded-[47px] transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`} style={{
                  background: 'conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)'
                }} />
                <div className="relative flex items-center bg-muted rounded-[45px] shadow-lg border border-border/30">
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder="Ask anything..." className="flex-1 px-5 py-3 bg-transparent rounded-[45px] text-foreground placeholder:text-muted-foreground focus:outline-none text-base" />
                  {searchQuery.trim() ? (
                    <button type="submit" className="p-3 mr-2 rounded-full bg-[#0081CF] text-white transition-all hover:bg-[#006bb3] shadow-[0_0_15px_rgba(0,129,207,0.5)]">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button type="button" className="p-3 mr-2 rounded-full bg-white transition-all">
                      <Mic className="w-5 h-5 text-gray-500 opacity-70" />
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-2 mt-3 relative z-10">
            {["Electronics", "Fashion", "Home", "Sports"].map(category => (
              <button 
                key={category} 
                onClick={() => navigate(`/?category=${category.toLowerCase()}`)} 
                className={`px-4 ${isFullScreen ? 'py-2' : 'py-1.5'} bg-card border border-border/50 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}