import { useSearchParams, useNavigate } from "react-router-dom";
import { HeroBanner } from "@/components/home/HeroBanner";
import { SearchResults } from "@/components/search/SearchResults";
import { LandingPage } from "@/components/home/LandingPage";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";

const Index = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryFilter = searchParams.get("category") || undefined;
  const searchQuery = searchParams.get("search") || undefined;
  const showLanding = searchParams.get("landing") === "true";

  const hasSearchOrCategory = categoryFilter || searchQuery;

  // Show landing page when explicitly requested
  if (showLanding) {
    return <LandingPage />;
  }

  // Show full-screen promotional section with chat icon (no header)
  if (!hasSearchOrCategory) {
    return (
      <div className="h-screen bg-muted/30 py-2 px-4 md:px-7">
        <div className="w-full h-full bg-muted rounded-3xl overflow-hidden shadow-2xl">
          <HeroBanner isFullScreen />
        </div>
        <FloatingChatButton onClick={() => navigate("/?category=electronics")} />
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
