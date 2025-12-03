import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { FeaturedProductsGrid } from "@/components/home/FeaturedProductsGrid";
import { CategoryTabs } from "@/components/home/CategoryTabs";

const Index = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || undefined;
  const searchQuery = searchParams.get("search") || undefined;

  return (
    <Layout>
      {!categoryFilter && !searchQuery && <HeroCarousel />}
      <FeaturedProductsGrid categoryFilter={categoryFilter} searchQuery={searchQuery} />
      <CategoryTabs />
    </Layout>
  );
};

export default Index;
