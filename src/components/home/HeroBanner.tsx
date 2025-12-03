import { useState } from "react";
import { ArrowRight } from "lucide-react";
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
  const [isFocused, setIsFocused] = useState(false);
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
      {/* Animated Background Grid - Three evenly spaced rows */}
      <div className="absolute inset-0 flex flex-col justify-between py-4">
        {/* Top Row - Moving Left */}
        <div className="flex gap-3 animate-scroll-left">
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
        <div className="flex gap-3 animate-scroll-right">
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
        <div className="flex gap-3 animate-scroll-left" style={{ animationDelay: '-10s' }}>
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

      {/* Center Content - Floating overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative flex flex-col items-center pointer-events-auto w-full max-w-[800px] px-4">
          {/* Fog/Blur background - enhanced layers like reference */}
          <div className={`absolute ${isFullScreen ? 'w-[700px] h-[320px]' : 'w-[500px] h-[220px]'} bg-background/90 blur-[60px] rounded-[40%] -z-10`} />
          <div className={`absolute ${isFullScreen ? 'w-[600px] h-[280px]' : 'w-[420px] h-[180px]'} bg-background blur-[40px] rounded-[40%] -z-10`} />
          <div className={`absolute ${isFullScreen ? 'w-[500px] h-[240px]' : 'w-[350px] h-[150px]'} bg-background blur-[25px] rounded-[40%] -z-10`} />
          
          {/* Logo for full screen */}
          {isFullScreen && (
            <div className="text-center mb-4">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Shop<span className="text-primary">Hub</span>
              </h1>
            </div>
          )}

          {/* Search Bar with rainbow gradient glow */}
          <form
            onSubmit={handleSearch}
            className={`w-full ${isFullScreen ? 'max-w-[580px]' : 'max-w-lg'}`}
          >
            <div className="relative">
              {/* Glassy gray border - always visible */}
              <div 
                className="absolute -inset-2 rounded-[50px] bg-muted/40 backdrop-blur-sm border border-border/50"
              />
              {/* Aurora gradient glow - enhanced on focus with pulse */}
              <div 
                className={`absolute -inset-1 rounded-[48px] blur-xl transition-opacity duration-300 ${isFocused ? 'opacity-80 animate-pulse' : 'opacity-40'}`}
                style={{
                  background: 'linear-gradient(90deg, #0081CF, #FF6FD8, #0081CF)',
                  transform: 'translateY(6px)'
                }}
              />
              {/* Aurora gradient border - animated on focus */}
              <div 
                className={`absolute -inset-[3px] rounded-[47px] transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  background: 'linear-gradient(90deg, #0081CF, #FF6FD8, #0081CF, #FF6FD8)',
                  backgroundSize: '200% 100%',
                  animation: isFocused ? 'gradient 3s linear infinite' : 'none'
                }}
              />
              {/* Search input container */}
              <div className="relative flex items-center bg-card rounded-[45px] shadow-lg border border-border/30">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Ask anything..."
                  className={`flex-1 ${isFullScreen ? 'px-6 py-4' : 'px-5 py-3'} bg-transparent rounded-[45px] text-foreground placeholder:text-muted-foreground focus:outline-none text-base`}
                />
                <button
                  type="submit"
                  className="p-3 mr-2 rounded-full text-white transition-all hover:opacity-90 bg-[#5dade2]"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["Electronics", "Fashion", "Home", "Sports"].map((category) => (
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
