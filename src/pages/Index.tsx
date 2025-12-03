import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroBanner } from "@/components/home/HeroBanner";
import { PromoBanner } from "@/components/home/PromoBanner";
import { BrowseCategories } from "@/components/home/BrowseCategories";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { FeaturedProductsGrid } from "@/components/home/FeaturedProductsGrid";
import { CategoryTabs } from "@/components/home/CategoryTabs";

const Index = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || undefined;
  const searchQuery = searchParams.get("search") || undefined;

  const hasSearchOrCategory = categoryFilter || searchQuery;

  // Show full-screen promotional section only (no header/footer)
  if (!hasSearchOrCategory) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-background rounded-3xl overflow-hidden shadow-2xl">
          <HeroBanner isFullScreen />
        </div>
      </div>
    );
  }

  // Show full landing page with products after search
  return (
    <Layout>
      <HeroBanner />
      <FeaturedProductsGrid categoryFilter={categoryFilter} searchQuery={searchQuery} />
      <CategoryTabs />
    </Layout>
  );
};

export default Index;
