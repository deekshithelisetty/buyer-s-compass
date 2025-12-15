import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { HeroBanner } from "@/components/home/HeroBanner";
import { SearchResults } from "@/components/search/SearchResults";

const Index = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || undefined;
  const searchQuery = searchParams.get("search") || undefined;

  const hasSearchOrCategory = categoryFilter || searchQuery;
  
  // Transition states
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (hasSearchOrCategory) {
      // Start transition animation
      setIsTransitioning(true);
      
      // After hero exit animation, show results with entrance animation
      const timer = setTimeout(() => {
        setShowResults(true);
      }, 400);
      
      return () => clearTimeout(timer);
    } else {
      setIsTransitioning(false);
      setShowResults(false);
    }
  }, [hasSearchOrCategory]);

  // Show full-screen promotional section with exit animation
  if (!hasSearchOrCategory || !showResults) {
    return (
      <div className={`h-screen bg-muted/30 py-4 px-10 transition-all duration-500 ease-out ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className={`w-full h-full bg-background rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 ease-out ${
          isTransitioning 
            ? 'scale-95 -translate-y-8 opacity-0' 
            : 'scale-100 translate-y-0 opacity-100'
        }`}>
          <HeroBanner isFullScreen />
        </div>
      </div>
    );
  }

  // Show search results page with entrance animation
  return (
    <div className="animate-page-enter">
      <SearchResults 
        searchQuery={searchQuery} 
        categoryFilter={categoryFilter} 
      />
    </div>
  );
};

export default Index;
