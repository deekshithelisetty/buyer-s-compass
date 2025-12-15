import { useSearchParams } from "react-router-dom";
import { HeroBanner } from "@/components/home/HeroBanner";
import { SearchResults } from "@/components/search/SearchResults";

const Index = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || undefined;
  const searchQuery = searchParams.get("search") || undefined;

  const hasSearchOrCategory = categoryFilter || searchQuery;

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
