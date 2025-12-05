import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronRight, Heart, Star } from "lucide-react";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";

// Hero images for the promotional section
const heroImages = {
  main: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
  side: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
};

// Category cards data
const categoryCards = [
  {
    title: "Trendy Sunglass",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    category: "accessories",
  },
  {
    title: "Popular Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    category: "fashion",
  },
];

// Browse categories data
const browseCategories = [
  { name: "Shoes", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200", category: "fashion" },
  { name: "Brass", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200", category: "accessories" },
  { name: "Bag", image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=200", category: "accessories" },
  { name: "T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200", category: "fashion" },
  { name: "Model", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200", category: "fashion" },
];

// Tab options for filtering
const collectionTabs = ["All", "Shorts", "Jackets", "Shoes", "T-Shirt"];
const categoryTabs = ["All", "Woman", "Children"];

export function LandingPage() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const [activeCollectionTab, setActiveCollectionTab] = useState("All");
  const [activeCategoryTab, setActiveCategoryTab] = useState("All");
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  const featuredProducts = products.slice(0, 4);

  const handleCategoryNav = (category: string) => {
    setSearchParams({ category });
  };

  const handleSearchNav = (search: string) => {
    setSearchParams({ search });
  };

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 px-4 md:px-7 py-2">
      <div className="bg-background rounded-3xl min-h-[calc(100vh-1rem)] overflow-hidden shadow-xl">
        {/* Navigation */}
        <nav className="flex items-center justify-center gap-6 py-4 px-6 border-b border-border/30">
          {["New Arrival", "Most Pick", "Sale", "Women", "Men", "Sneakers", "Store Location", "Contact Us"].map((item, index) => (
            <button
              key={item}
              onClick={() => {
                if (item === "New Arrival") handleCategoryNav("electronics");
                else if (item === "Women") handleCategoryNav("fashion");
                else if (item === "Men") handleCategoryNav("fashion");
                else if (item === "Sneakers") handleCategoryNav("fashion");
                else handleSearchNav(item.toLowerCase());
              }}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                index === 0 ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <div className="p-4 md:p-6 space-y-6">
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Main Hero Card */}
            <div className="md:col-span-2 relative bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl overflow-hidden h-[300px] md:h-[350px]">
              <div className="absolute inset-0 flex">
                {/* Left content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
                    Summer<br />
                    Arrival of<br />
                    Outfit
                  </h1>
                  <p className="text-sm text-muted-foreground mb-4 max-w-[200px]">
                    Discover quality fashion that reflects your style and makes everyday enjoyable.
                  </p>
                  <Button 
                    onClick={() => handleCategoryNav("fashion")}
                    className="w-fit rounded-full px-6"
                  >
                    Explore Product <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                {/* Center image */}
                <div className="flex-1 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400" 
                    alt="Summer Fashion" 
                    className="absolute bottom-0 right-0 h-full w-auto object-cover object-top"
                  />
                </div>
                {/* Right discount badge */}
                <div className="absolute top-6 right-6 text-right">
                  <span className="text-5xl md:text-6xl font-bold text-foreground">50%</span>
                  <p className="text-lg text-muted-foreground">OFF</p>
                </div>
              </div>
            </div>

            {/* Side Hero Card */}
            <div className="relative bg-gradient-to-br from-rose-50 to-rose-100 rounded-3xl overflow-hidden h-[300px] md:h-[350px]">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" 
                alt="Fashion Model" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryCards.map((card) => (
              <button
                key={card.title}
                onClick={() => handleCategoryNav(card.category)}
                className="group relative bg-muted/50 rounded-3xl overflow-hidden h-[120px] md:h-[140px] flex items-center justify-between px-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">{card.title}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="h-20 md:h-24 w-auto object-contain group-hover:scale-105 transition-transform"
                  />
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Browse by Categories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">Browse by categories</h2>
              <div className="flex gap-2">
                {categoryTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCategoryTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategoryTab === tab
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {browseCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryNav(cat.category)}
                  className="flex-shrink-0 group"
                >
                  <div className="w-[140px] h-[160px] bg-muted/50 rounded-2xl overflow-hidden mb-2 group-hover:shadow-md transition-shadow">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* New Collection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">New Collection</h2>
              <div className="flex gap-2">
                {collectionTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCollectionTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCollectionTab === tab
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredProducts.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-muted/30 rounded-2xl p-3 mb-2 aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(product.id);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${likedProducts.has(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                    </button>
                    <button className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 text-primary-foreground" />
                    </button>
                  </div>
                  <h3 className="text-sm font-medium text-foreground line-clamp-1 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">{product.price.toFixed(2)} AED</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
