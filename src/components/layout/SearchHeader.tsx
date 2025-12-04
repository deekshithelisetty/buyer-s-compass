import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, X, Mic, ShoppingCart, User, Globe } from "lucide-react";

interface SearchHeaderProps {
  initialQuery?: string;
}

export function SearchHeader({ initialQuery = "" }: SearchHeaderProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(localSearchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/30 rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
        {/* Logo */}
        <button onClick={() => navigate("/?landing=true")} className="flex-shrink-0">
          <img src="/images/infinityhub-logo.png" alt="InfinityHub" className="h-9 w-auto" />
        </button>

        {/* Search Bar - Centered */}
        <form onSubmit={handleSearch} className="flex-1 max-w-lg">
          <div className="relative">
            {/* Glassy gray border - always visible */}
            <div className="absolute -inset-2 rounded-[50px] bg-muted/40 backdrop-blur-sm border border-border/50" />
            {/* Aurora gradient glow - only on focus */}
            <div
              className={`absolute -inset-[8px] rounded-[52px] blur-md transition-opacity duration-500 ${isFocused ? "opacity-60" : "opacity-0"}`}
              style={{
                background: "conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)",
              }}
            />
            {/* Aurora gradient border - only on focus */}
            <div
              className={`absolute -inset-[3px] rounded-[47px] transition-opacity duration-500 ${isFocused ? "opacity-100" : "opacity-0"}`}
              style={{
                background: "conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)",
              }}
            />
            {/* Search input container */}
            <div className="relative flex items-center bg-muted rounded-[45px] shadow-lg border border-border/30">
              <input
                type="text"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask anything..."
                className="flex-1 px-6 py-3 bg-transparent rounded-[45px] text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
              />
              {localSearchQuery ? (
                <button
                  type="button"
                  onClick={() => setLocalSearchQuery("")}
                  className="p-2.5 mr-2 rounded-full bg-[#0081CF] text-white transition-all hover:bg-[#006bb3] shadow-[0_0_15px_rgba(0,129,207,0.5)]"
                >
                  <X className="w-4 h-4" />
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
  );
}
