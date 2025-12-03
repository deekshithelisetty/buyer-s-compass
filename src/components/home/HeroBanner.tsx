import { useState } from "react";
import { ArrowRight, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
const backgroundImages = ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400", "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400", "https://images.unsplash.com/photo-1491553895911-0055uj?w=400", "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400", "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400", "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400", "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400", "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"];
interface HeroBannerProps {
  isFullScreen?: boolean;
}
export function HeroBanner({
  isFullScreen = false
}: HeroBannerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  const containerHeight = isFullScreen ? "h-full" : "h-[280px] md:h-[320px]";
  const cardSize = isFullScreen ? 'w-36 h-36 md:w-44 md:h-44' : 'w-20 h-20 md:w-24 md:h-24';
  return <section className={`relative ${containerHeight} overflow-hidden bg-background`}>
      {/* Animated Background Grid - Three evenly spaced rows */}
      <div className="absolute inset-0 flex flex-col justify-between py-4">
        {/* Top Row - Moving Left */}
        <div className="flex gap-3 animate-scroll-left">
          {[...backgroundImages.slice(0, 8), ...backgroundImages.slice(0, 8)].map((img, i) => <div key={`top-${i}`} className={`flex-shrink-0 ${cardSize} rounded-2xl overflow-hidden bg-card shadow-lg`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>)}
        </div>

        {/* Middle Row - Moving Right */}
        <div className="flex gap-3 animate-scroll-right">
          {[...backgroundImages.slice(4, 12), ...backgroundImages.slice(4, 12)].map((img, i) => <div key={`middle-${i}`} className={`flex-shrink-0 ${cardSize} rounded-2xl overflow-hidden bg-card shadow-lg`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>)}
        </div>

        {/* Bottom Row - Moving Left */}
        <div className="flex gap-3 animate-scroll-left" style={{
        animationDelay: '-10s'
      }}>
          {[...backgroundImages.slice(8, 16), ...backgroundImages.slice(8, 16)].map((img, i) => <div key={`bottom-${i}`} className={`flex-shrink-0 ${cardSize} rounded-2xl overflow-hidden bg-card shadow-lg`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>)}
        </div>
      </div>

      {/* Center Content - Floating overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative flex flex-col items-center justify-center pointer-events-auto w-full max-w-[800px] px-4">
          {/* Fog/Blur background - enhanced layers */}
          <div className={`absolute ${isFullScreen ? 'w-[650px] h-[280px]' : 'w-[480px] h-[200px]'} bg-background/95 blur-[80px] rounded-[50%] -z-10`} />
          <div className={`absolute ${isFullScreen ? 'w-[550px] h-[240px]' : 'w-[400px] h-[170px]'} bg-background blur-[50px] rounded-[50%] -z-10`} />
          <div className={`absolute ${isFullScreen ? 'w-[450px] h-[200px]' : 'w-[320px] h-[140px]'} bg-background blur-[30px] rounded-[50%] -z-10`} />
          
          {/* Logo for full screen */}
          {isFullScreen && <div className="text-center mb-2">
              <img src="/images/infinityhub-logo.png" alt="InfinityHub - Endless Choices" className="h-36 md:h-14 w-auto mx-auto shadow-none" />
            </div>}

          {/* Search Bar with rainbow gradient glow */}
          <form onSubmit={handleSearch} className={`w-full ${isFullScreen ? 'max-w-[580px]' : 'max-w-lg'}`}>
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
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder="Ask anything..." className={`flex-1 ${isFullScreen ? 'px-6 py-4' : 'px-5 py-3'} bg-transparent rounded-[45px] text-foreground placeholder:text-muted-foreground focus:outline-none text-base`} />
                {searchQuery.trim() ? <button type="submit" className="p-3 mr-2 rounded-full bg-[#0081CF] text-white transition-all hover:bg-[#006bb3] shadow-[0_0_15px_rgba(0,129,207,0.5)]">
                    <ArrowRight className="w-5 h-5" />
                  </button> : <button type="button" className="p-3 mr-2 rounded-full bg-white transition-all">
                    <Mic className="w-5 h-5 text-gray-500 opacity-70" />
                  </button>}
              </div>
            </div>
          </form>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {["Electronics", "Fashion", "Home", "Sports"].map(category => <button key={category} onClick={() => navigate(`/?category=${category.toLowerCase()}`)} className={`px-4 ${isFullScreen ? 'py-2' : 'py-1.5'} bg-card border border-border/50 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300`}>
                {category}
              </button>)}
          </div>
        </div>
      </div>
    </section>;
}