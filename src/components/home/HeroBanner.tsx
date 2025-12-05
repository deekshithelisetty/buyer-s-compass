import { useState } from "react";
import { ArrowRight, Mic } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
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
      navigate({ pathname: "/", search: `?search=${encodeURIComponent(searchQuery.trim())}` });
    }
  };
  const containerHeight = isFullScreen ? "h-full" : "h-[280px] md:h-[320px]";
  const cardSize = isFullScreen ? 'w-36 h-36 md:w-44 md:h-44' : 'w-20 h-20 md:w-24 md:h-24';
  return <section className={`relative ${containerHeight} overflow-hidden bg-background`}>
      {/* Animated Background Grid - Three evenly spaced rows */}
      <div className="absolute inset-0 flex flex-col justify-between py-4">
        {/* Top Row - Moving Left */}
        <div className="flex gap-3 animate-scroll-left">
          {[...row1Images, ...row1Images].map((img, i) => <div key={`top-${i}`} className={`flex-shrink-0 ${cardSize} rounded-2xl overflow-hidden bg-card shadow-lg`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>)}
        </div>

        {/* Middle Row - Moving Right */}
        <div className="flex gap-3 animate-scroll-right">
          {[...row2Images, ...row2Images].map((img, i) => <div key={`middle-${i}`} className={`flex-shrink-0 ${cardSize} rounded-2xl overflow-hidden bg-card shadow-lg`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>)}
        </div>

        {/* Bottom Row - Moving Left */}
        <div className="flex gap-3 animate-scroll-left" style={{
        animationDelay: '-10s'
      }}>
          {[...row3Images, ...row3Images].map((img, i) => <div key={`bottom-${i}`} className={`flex-shrink-0 ${cardSize} rounded-2xl overflow-hidden bg-card shadow-lg`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>)}
        </div>
      </div>

      {/* Center Content - Floating overlay */}
      <div className="absolute inset-0 flex items-center justify-center" style={{
      marginTop: '-70px'
    }}>
        <div className="relative flex flex-col items-center justify-center w-full max-w-[800px] px-4">
          {/* Fog/Blur background - positioned above product images */}
          <div className={`absolute ${isFullScreen ? 'w-[750px] h-[400px]' : 'w-[550px] h-[280px]'} bg-background/60 rounded-[50%]`} style={{ filter: 'blur(80px)', zIndex: 1 }} />
          <div className={`absolute ${isFullScreen ? 'w-[650px] h-[350px]' : 'w-[450px] h-[230px]'} bg-background/50 rounded-[50%]`} style={{ filter: 'blur(50px)', zIndex: 1 }} />
          <div className={`absolute ${isFullScreen ? 'w-[550px] h-[300px]' : 'w-[380px] h-[180px]'} bg-background/50 rounded-[50%]`} style={{ filter: 'blur(30px)', zIndex: 1 }} />
          
          
          {/* Logo for full screen */}
          {isFullScreen && <div className="text-center -mb-2 relative z-10">
              <img src="/images/infinityhub-logo.png" alt="InfinityHub - Endless Choices" className="h-36 md:h-36 w-auto mx-auto shadow-none" />
            </div>}

          {/* Search Bar with rainbow gradient glow */}
          <form onSubmit={handleSearch} className={`w-full ${isFullScreen ? 'max-w-[580px]' : 'max-w-lg'} relative z-10`}>
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
          <div className="flex flex-wrap justify-center gap-2 mt-3 relative z-10">
            {["Electronics", "Fashion", "Home", "Sports"].map(category => (
              <Link 
                key={category} 
                to={`/?category=${category.toLowerCase()}`}
                className={`px-4 ${isFullScreen ? 'py-2' : 'py-1.5'} bg-card border border-border/50 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>;
}