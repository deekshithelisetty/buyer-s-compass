import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

const Index = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || undefined;
  const searchQuery = searchParams.get("search") || undefined;

  return (
    <Layout>
      {!categoryFilter && !searchQuery && <HeroSection />}
      <CategorySection />
      <FeaturedProducts categoryFilter={categoryFilter} searchQuery={searchQuery} />
    </Layout>
  );
};

export default Index;
