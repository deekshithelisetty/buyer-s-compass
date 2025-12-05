import { useSearchParams } from "react-router-dom";
import { HeroBanner } from "@/components/home/HeroBanner";
import { SearchResults } from "@/components/search/SearchResults";
import { LandingPage } from "@/components/home/LandingPage";

const Index = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || undefined;
  const searchQuery = searchParams.get("search") || undefined;
  const showLanding = searchParams.get("landing") === "true";

  const hasSearchOrCategory = categoryFilter || searchQuery;

  // Show landing page when explicitly requested
  if (showLanding) {
    return <LandingPage />;
  }

  // Show full-screen promotional section only (no header/footer)
  if (!hasSearchOrCategory) {
    return (
      <div className="h-screen bg-muted/30 py-4 px-10">
        <div className="w-full h-full bg-background rounded-3xl overflow-hidden shadow-2xl">
          <HeroBanner isFullScreen />
        </div>
      </div>
    );
  }

  // Show search results page with zoom-in animation
  return (
    <SearchResults 
      searchQuery={searchQuery} 
      categoryFilter={categoryFilter} 
    />
  );
};

export default Index;
