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

export function HeroBanner() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-muted via-background to-secondary/30">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top Row - Moving Left */}
        <div className="absolute top-0 left-0 flex gap-4 animate-scroll-left">
          {[...backgroundImages.slice(0, 8), ...backgroundImages.slice(0, 8)].map((img, i) => (
            <div
              key={`top-${i}`}
              className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden opacity-60"
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Bottom Row - Moving Right */}
        <div className="absolute bottom-0 left-0 flex gap-4 animate-scroll-right">
          {[...backgroundImages.slice(8, 16), ...backgroundImages.slice(8, 16)].map((img, i) => (
            <div
              key={`bottom-${i}`}
              className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden opacity-60"
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Left Column - Moving Up */}
        <div className="absolute top-0 left-0 flex flex-col gap-4 animate-scroll-up">
          {[...backgroundImages.slice(0, 4), ...backgroundImages.slice(0, 4)].map((img, i) => (
            <div
              key={`left-${i}`}
              className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden opacity-50"
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Right Column - Moving Down */}
        <div className="absolute top-0 right-0 flex flex-col gap-4 animate-scroll-down">
          {[...backgroundImages.slice(4, 8), ...backgroundImages.slice(4, 8)].map((img, i) => (
            <div
              key={`right-${i}`}
              className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden opacity-50"
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Brand */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-2">
            Shop<span className="text-primary">Hub</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            AI-Powered Shopping Experience
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-2xl animate-fade-in-up delay-200"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-card/95 backdrop-blur-xl border border-border/50 rounded-full shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
              <Search className="w-5 h-5 text-muted-foreground ml-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 px-4 py-4 md:py-5 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base md:text-lg"
              />
              <button
                type="button"
                className="p-3 mr-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in-up delay-300">
          {["Electronics", "Fashion", "Home", "Sports"].map((category) => (
            <button
              key={category}
              onClick={() => navigate(`/?category=${category.toLowerCase()}`)}
              className="px-4 py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
