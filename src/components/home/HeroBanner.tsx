import { useState } from "react";
import { Search, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

const backgroundImages = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
  "https://images.unsplash.com/photo-1491553895911-0055uj?w=400",
  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
  "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
  "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400",
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
];

interface HeroBannerProps {
  isFullScreen?: boolean;
}

export function HeroBanner({ isFullScreen = false }: HeroBannerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const containerHeight = isFullScreen 
    ? "h-full" 
    : "h-[280px] md:h-[320px]";

  const cardSize = isFullScreen 
    ? 'w-36 h-36 md:w-44 md:h-44' 
    : 'w-20 h-20 md:w-24 md:h-24';

  return (
    <section className={`relative ${containerHeight} overflow-hidden bg-background`}>
      {/* Center Content - Positioned at top */}
      <div className="relative z-10 pt-8 md:pt-12 flex flex-col items-center px-4">
        {/* Logo for full screen */}
        {isFullScreen && (
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Shop<span className="text-primary">Hub</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">AI-Powered Shopping Experience</p>
          </div>
        )}

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className={`w-full ${isFullScreen ? 'max-w-lg' : 'max-w-md'}`}
        >
          <div className="relative flex items-center bg-card border border-border rounded-full shadow-lg overflow-hidden">
            <Search className="w-5 h-5 text-muted-foreground ml-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask anything..."
              className={`flex-1 px-3 ${isFullScreen ? 'py-3.5' : 'py-2.5'} bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm`}
            />
            <button
              type="button"
              className="p-2 mr-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {["Electronics", "Fashion", "Home", "Sports"].map((category) => (
            <button
              key={category}
              onClick={() => navigate(`/?category=${category.toLowerCase()}`)}
              className={`px-4 ${isFullScreen ? 'py-2.5' : 'py-2'} bg-card/80 backdrop-blur-sm border border-border/50 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Background Grid - Below content */}
      <div className="absolute inset-0 overflow-hidden pt-48 md:pt-56">
        {/* Top Row - Moving Left */}
        <div className="absolute top-0 left-0 flex gap-3 animate-scroll-left">
          {[...backgroundImages.slice(0, 8), ...backgroundImages.slice(0, 8)].map((img, i) => (
            <div
              key={`top-${i}`}
              className={`flex-shrink-0 ${cardSize} rounded-2xl overflow-hidden bg-card shadow-lg`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Middle Row - Moving Right */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 flex gap-3 animate-scroll-right">
          {[...backgroundImages.slice(4, 12), ...backgroundImages.slice(4, 12)].map((img, i) => (
            <div
              key={`middle-${i}`}
              className={`flex-shrink-0 ${cardSize} rounded-2xl overflow-hidden bg-card shadow-lg`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Bottom Row - Moving Left */}
        <div className="absolute bottom-4 left-0 flex gap-3 animate-scroll-left" style={{ animationDelay: '-10s' }}>
          {[...backgroundImages.slice(8, 16), ...backgroundImages.slice(8, 16)].map((img, i) => (
            <div
              key={`bottom-${i}`}
              className={`flex-shrink-0 ${cardSize} rounded-2xl overflow-hidden bg-card shadow-lg`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
