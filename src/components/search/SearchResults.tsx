import { useState, useEffect, useRef, useCallback } from "react";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, ChevronRight, X, Mic, Search, ShoppingCart, User, Globe, Heart, Star, Bot, MapPin, ArrowUpRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types/product";
interface SearchResultsProps {
  searchQuery?: string;
  categoryFilter?: string;
}

// Product Card Component matching the reference design
function ProductCardNew({
  product,
  index
}: {
  product: Product;
  index: number;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  return <div className="group cursor-pointer animate-slide-up" style={{
    animationDelay: `${index % 10 * 50 + 200}ms`
  }} onClick={() => navigate(`/product/${product.id}`)}>
      {/* Image Container */}
      <div className="relative bg-muted/30 rounded-2xl p-3 mb-2 aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" />
        {/* Heart Icon */}
        <button onClick={e => {
        e.stopPropagation();
        setIsLiked(!isLiked);
      }} className="absolute top-3 right-3 p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
        </button>
      </div>

      {/* Product Info */}
      <div className="px-1">
        <h3 className="text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors font-sans font-normal text-xs text-left">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} />)}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-semibold text-foreground">
            {product.price.toFixed(2)} <span className="text-xs text-muted-foreground">AED</span>
          </span>
          {product.originalPrice && <span className="text-xs text-muted-foreground line-through">
              {product.originalPrice.toFixed(2)}
            </span>}
        </div>
      </div>
    </div>;
}

// Chat message types
interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  options?: ChatOption[];
}

interface ChatOption {
  label: string;
  value: string;
  filterType: 'category' | 'price' | 'rating' | 'style';
}

// AI Question Generator based on user query
function generateAIQuestions(query: string): { message: string; options: ChatOption[] }[] {
  const lowerQuery = query.toLowerCase();
  const questions: { message: string; options: ChatOption[] }[] = [];

  // Detect intent from query
  if (lowerQuery.includes('phone') || lowerQuery.includes('mobile') || lowerQuery.includes('laptop') || lowerQuery.includes('electronic')) {
    questions.push({
      message: "What's your budget range for electronics?",
      options: [
        { label: "Under 50 AED", value: "under50", filterType: "price" },
        { label: "50-100 AED", value: "50to100", filterType: "price" },
        { label: "100-200 AED", value: "100to200", filterType: "price" },
        { label: "200+ AED", value: "over500", filterType: "price" },
      ]
    });
    questions.push({
      message: "Looking for a specific category?",
      options: [
        { label: "Electronics", value: "electronics", filterType: "category" },
        { label: "All Categories", value: "", filterType: "category" },
      ]
    });
  } else if (lowerQuery.includes('shirt') || lowerQuery.includes('dress') || lowerQuery.includes('cloth') || lowerQuery.includes('fashion') || lowerQuery.includes('wear')) {
    questions.push({
      message: "What type of clothing are you looking for?",
      options: [
        { label: "Fashion", value: "fashion", filterType: "category" },
        { label: "Sports Wear", value: "sports", filterType: "category" },
        { label: "All Clothing", value: "", filterType: "category" },
      ]
    });
    questions.push({
      message: "What's your preferred price range?",
      options: [
        { label: "Budget Friendly (Under 50)", value: "under50", filterType: "price" },
        { label: "Mid Range (50-100)", value: "50to100", filterType: "price" },
        { label: "Premium (100+)", value: "100to200", filterType: "price" },
      ]
    });
  } else if (lowerQuery.includes('sport') || lowerQuery.includes('fitness') || lowerQuery.includes('gym') || lowerQuery.includes('exercise')) {
    questions.push({
      message: "What sports category interests you?",
      options: [
        { label: "Sports Equipment", value: "sports", filterType: "category" },
        { label: "Sports Fashion", value: "fashion", filterType: "category" },
      ]
    });
    questions.push({
      message: "What rating should products have?",
      options: [
        { label: "4.5+ Stars Only", value: "4.5", filterType: "rating" },
        { label: "4+ Stars", value: "4", filterType: "rating" },
        { label: "Any Rating", value: "", filterType: "rating" },
      ]
    });
  } else if (lowerQuery.includes('book') || lowerQuery.includes('read')) {
    questions.push({
      message: "Looking for books?",
      options: [
        { label: "Yes, show me books", value: "books", filterType: "category" },
        { label: "No, show all products", value: "", filterType: "category" },
      ]
    });
  } else if (lowerQuery.includes('home') || lowerQuery.includes('garden') || lowerQuery.includes('furniture') || lowerQuery.includes('decor')) {
    questions.push({
      message: "What home category are you interested in?",
      options: [
        { label: "Home & Garden", value: "home", filterType: "category" },
        { label: "All Products", value: "", filterType: "category" },
      ]
    });
  } else if (lowerQuery.includes('beauty') || lowerQuery.includes('makeup') || lowerQuery.includes('cosmetic') || lowerQuery.includes('skincare')) {
    questions.push({
      message: "Looking for beauty products?",
      options: [
        { label: "Yes, Beauty Products", value: "beauty", filterType: "category" },
        { label: "Show All", value: "", filterType: "category" },
      ]
    });
  } else {
    // Generic questions for any query
    questions.push({
      message: "Which category would you like to explore?",
      options: [
        { label: "Electronics 📱", value: "electronics", filterType: "category" },
        { label: "Fashion 👕", value: "fashion", filterType: "category" },
        { label: "Sports ⚽", value: "sports", filterType: "category" },
        { label: "Home 🏠", value: "home", filterType: "category" },
        { label: "Books 📚", value: "books", filterType: "category" },
        { label: "Beauty 💄", value: "beauty", filterType: "category" },
      ]
    });
    questions.push({
      message: "What's your budget?",
      options: [
        { label: "Under 50 AED", value: "under50", filterType: "price" },
        { label: "50-100 AED", value: "50to100", filterType: "price" },
        { label: "100-500 AED", value: "100to200", filterType: "price" },
        { label: "Any Budget", value: "", filterType: "price" },
      ]
    });
  }

  return questions;
}

// Chat Input Component with aurora gradient focus effect
function ChatInputWithSubmit({ onSubmit }: { onSubmit: (message: string) => void }) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Glassy gray border - always visible */}
      <div className="absolute -inset-1.5 rounded-[40px] bg-muted/40 backdrop-blur-sm border border-border/50" />
      {/* Aurora gradient glow - only on focus */}
      <div className={`absolute -inset-[6px] rounded-[42px] blur-md transition-opacity duration-500 ${isFocused ? 'opacity-60' : 'opacity-0'}`} style={{
        background: 'conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)'
      }} />
      {/* Aurora gradient border - only on focus */}
      <div className={`absolute -inset-[2px] rounded-[38px] transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`} style={{
        background: 'conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)'
      }} />
      {/* Input container */}
      <div className="relative flex items-center bg-muted rounded-[36px] shadow-lg border border-border/30">
        <input 
          type="text" 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)} 
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)} 
          placeholder="Ask about products..." 
          className="flex-1 px-5 py-3 bg-transparent rounded-[36px] text-foreground placeholder:text-muted-foreground focus:outline-none text-sm" 
        />
        {inputValue ? (
          <button 
            type="submit" 
            className="p-2 mr-2 rounded-full bg-[#0081CF] text-white transition-all hover:bg-[#006bb3] shadow-[0_0_15px_rgba(0,129,207,0.5)]"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        ) : (
          <button type="button" className="p-2 mr-2 rounded-full bg-white transition-all">
            <Mic className="w-4 h-4 text-gray-500 opacity-70" />
          </button>
        )}
      </div>
    </form>
  );
}

// Promo Landing Content Component
function PromoLandingContent({ onCategoryClick }: { onCategoryClick: (category: string) => void }) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [collectionFilter, setCollectionFilter] = useState("ALL");
  
  const filters = ["ALL", "FASHION", "ELECTRONICS", "SPORTS", "HOME"];
  const collectionFilters = ["ALL", "SHORTS", "JACKETS", "SHOES", "T-SHIRT"];
  
  // Filter products based on active category filter - show 15 cards
  const getFilteredProducts = (filter: string) => {
    if (filter === "ALL") return products.slice(0, 15);
    return products.filter(p => p.category.toLowerCase() === filter.toLowerCase()).slice(0, 15);
  };
  
  const filteredCategoryProducts = getFilteredProducts(activeFilter);
  
  // Filter collection products - show 15 cards
  const getCollectionProducts = (filter: string) => {
    if (filter === "ALL") return products.slice(0, 15);
    const filterMap: Record<string, string[]> = {
      "SHORTS": ["fashion", "sports"],
      "JACKETS": ["fashion"],
      "SHOES": ["fashion", "sports"],
      "T-SHIRT": ["fashion"],
    };
    const categories = filterMap[filter] || [];
    return products.filter(p => categories.some(cat => p.category.toLowerCase().includes(cat))).slice(0, 15);
  };
  
  const filteredCollectionProducts = getCollectionProducts(collectionFilter);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Bento Grid */}
      <div className="grid grid-cols-4 gap-4 h-[380px]">
        {/* Main Hero Card */}
        <div className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800" 
            alt="Summer Collection" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-6 left-6">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">50% OFF</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-white text-3xl font-bold mb-2">Summer Arrival<br/>of Outfit</h2>
            <button 
              onClick={() => onCategoryClick("fashion")}
              className="flex items-center gap-2 text-white text-sm font-medium hover:gap-3 transition-all"
            >
              Explore Product <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Secondary Hero Image */}
        <div className="col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer" onClick={() => onCategoryClick("fashion")}>
          <img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800" 
            alt="Fashion" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <button className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <ArrowUpRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
        
        {/* Trendy Sunglasses Card */}
        <div 
          className="relative rounded-2xl overflow-hidden bg-[#bec9be] group cursor-pointer"
          onClick={() => onCategoryClick("fashion")}
        >
          <div className="flex items-center justify-between h-full px-5 py-4">
            <div className="flex-shrink-0 z-10">
              <p className="text-foreground/60 text-sm font-medium">Trendy</p>
              <h3 className="text-xl font-bold text-foreground">Sunglass</h3>
            </div>
            <div className="flex-1 flex justify-end items-center pr-8">
              <img 
                src="https://pngimg.com/uploads/sunglasses/sunglasses_PNG25.png" 
                alt="Sunglasses" 
                className="w-40 h-auto object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-xl"
              />
            </div>
          </div>
          <button className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 rounded-xl flex items-center justify-center shadow-md hover:bg-white transition-colors">
            <ArrowUpRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
        
        {/* Popular Shoes Card */}
        <div 
          className="relative rounded-2xl overflow-hidden bg-[#e0ccc7] group cursor-pointer"
          onClick={() => onCategoryClick("fashion")}
        >
          <div className="flex items-center justify-between h-full px-5 py-4">
            <div className="flex-shrink-0 z-10">
              <p className="text-foreground/60 text-sm font-medium">Popular</p>
              <h3 className="text-xl font-bold text-foreground">Shoes</h3>
            </div>
            <div className="flex-1 flex justify-end items-center pr-8">
              <img 
                src="https://pngimg.com/uploads/running_shoes/running_shoes_PNG5816.png" 
                alt="Shoes" 
                className="w-40 h-auto object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-xl"
              />
            </div>
          </div>
          <button className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 rounded-xl flex items-center justify-center shadow-md hover:bg-white transition-colors">
            <ArrowUpRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
      
      {/* Browse by Categories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Browse by categories</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {categories.slice(0, 10).map((category, index) => (
            <div
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className="group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative bg-muted/30 rounded-2xl p-3 aspect-square overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-2xl mb-1 block">{category.icon}</span>
                  <h3 className="text-white font-semibold text-sm">{category.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* New Collection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">New Collection</h2>
          <div className="flex gap-2">
            {collectionFilters.map(filter => (
              <button
                key={filter}
                onClick={() => setCollectionFilter(filter)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  collectionFilter === filter 
                    ? 'bg-foreground text-background' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {filteredCollectionProducts.map((product, index) => (
            <ProductCardNew key={product.id} product={product} index={index} />
          ))}
        </div>
        {filteredCollectionProducts.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No products found</p>
        )}
      </div>
    </div>
  );
}

export function SearchResults({
  searchQuery,
  categoryFilter
}: SearchResultsProps) {
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "");
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");
  const [isFocused, setIsFocused] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [visibleCount, setVisibleCount] = useState(isChatOpen ? 10 : 15);
  const [isLoading, setIsLoading] = useState(false);
  const [pincode, setPincode] = useState("123456");
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeOpen, setPincodeOpen] = useState(false);
  const [showPromoView, setShowPromoView] = useState(!searchQuery && !categoryFilter);
  
  // Filter states
  const [filterCategory, setFilterCategory] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterSize, setFilterSize] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  
  // Chat states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [pendingQuestions, setPendingQuestions] = useState<{ message: string; options: ChatOption[] }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const ITEMS_PER_LOAD = 10;
  
  const filteredProducts = products.filter(product => {
    // Use dropdown filter if set, otherwise use URL category filter
    const activeCategory = filterCategory || categoryFilter;
    const matchesCategory = !activeCategory || product.category === activeCategory;
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = !filterRating || product.rating >= parseFloat(filterRating);
    const matchesPrice = !filterPrice || 
      (filterPrice === "under50" && product.price < 50) ||
      (filterPrice === "50to100" && product.price >= 50 && product.price <= 100) ||
      (filterPrice === "100to200" && product.price >= 100 && product.price <= 200) ||
      (filterPrice === "200to500" && product.price >= 200 && product.price <= 500) ||
      (filterPrice === "over500" && product.price > 500);
    return matchesCategory && matchesSearch && matchesRating && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "priceLowHigh") return a.price - b.price;
    if (sortBy === "priceHighLow") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.reviews - a.reviews;
    return 0;
  });
  
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setVisibleCount(prev => prev + ITEMS_PER_LOAD);
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore]);

  // Update visible count when chat panel opens/closes
  useEffect(() => {
    const baseCount = isChatOpen ? 10 : 15;
    setVisibleCount(prev => Math.max(prev, baseCount));
  }, [isChatOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      setShowPromoView(false);
      navigate(`/?search=${encodeURIComponent(localSearchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    setShowPromoView(false);
    navigate(`/?category=${category}`);
  };

  const handleLogoClick = () => {
    setShowPromoView(true);
    setLocalSearchQuery("");
  };

  // Chat handlers
  const handleChatSubmit = (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message
    };
    setChatMessages(prev => [...prev, userMessage]);
    setShowPromoView(false);
    
    // Generate AI questions based on user query
    const questions = generateAIQuestions(message);
    setPendingQuestions(questions);
    setCurrentQuestionIndex(0);
    
    // Add first AI question
    if (questions.length > 0) {
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: questions[0].message,
          options: questions[0].options
        };
        setChatMessages(prev => [...prev, aiMessage]);
      }, 500);
    }
  };

  const handleOptionClick = (option: ChatOption) => {
    // Add user selection as message
    const selectionMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: option.label
    };
    setChatMessages(prev => [...prev, selectionMessage]);

    // Apply filter based on selection
    switch (option.filterType) {
      case 'category':
        setFilterCategory(option.value);
        break;
      case 'price':
        setFilterPrice(option.value);
        break;
      case 'rating':
        setFilterRating(option.value);
        break;
    }

    // Show next question or confirm
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < pendingQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimeout(() => {
        const nextQuestion: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: pendingQuestions[nextIndex].message,
          options: pendingQuestions[nextIndex].options
        };
        setChatMessages(prev => [...prev, nextQuestion]);
      }, 400);
    } else {
      // All questions answered - show confirmation
      setTimeout(() => {
        const confirmMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: `Great! I've filtered the products for you. ${filteredProducts.length > 0 ? `Found ${filteredProducts.length} matching products!` : 'Try adjusting filters for more results.'}`
        };
        setChatMessages(prev => [...prev, confirmMessage]);
      }, 400);
    }
  };

  // Scroll chat to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "home", label: "Home & Garden" },
    { value: "sports", label: "Sports" },
    { value: "books", label: "Books" },
    { value: "beauty", label: "Beauty" },
  ];
  
  const ratingOptions = [
    { value: "", label: "All Ratings" },
    { value: "4.5", label: "4.5+ Stars" },
    { value: "4", label: "4+ Stars" },
    { value: "3.5", label: "3.5+ Stars" },
    { value: "3", label: "3+ Stars" },
  ];
  
  const genderOptions = [
    { value: "", label: "All" },
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "unisex", label: "Unisex" },
  ];
  
  const sizeOptions = [
    { value: "", label: "All Sizes" },
    { value: "xs", label: "XS" },
    { value: "s", label: "S" },
    { value: "m", label: "M" },
    { value: "l", label: "L" },
    { value: "xl", label: "XL" },
  ];
  
  const colorOptions = [
    { value: "", label: "All Colors" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
  ];
  
  const priceOptions = [
    { value: "", label: "All Prices" },
    { value: "under50", label: "Under $50" },
    { value: "50to100", label: "$50 - $100" },
    { value: "100to200", label: "$100 - $200" },
    { value: "200to500", label: "$200 - $500" },
    { value: "over500", label: "Over $500" },
  ];
  
  const sortOptions = [
    { value: "", label: "Default" },
    { value: "priceLowHigh", label: "Price: Low to High" },
    { value: "priceHighLow", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "reviews", label: "Most Reviews" },
  ];

  const FilterDropdown = ({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (val: string) => void }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={`rounded-full bg-muted/50 hover:bg-muted gap-1 text-xs border-border/50 ${value ? 'bg-primary/10 border-primary/30 text-primary' : ''}`}>
          {value ? options.find(o => o.value === value)?.label : label}
          <ChevronDown className="w-3 h-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-1 bg-background border border-border shadow-lg z-50" align="start">
        <div className="flex flex-col">
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`px-3 py-2 text-left text-sm hover:bg-muted rounded transition-colors ${value === option.value ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
  return <div className="min-h-screen bg-muted/30 px-7 py-2 animate-zoom-in">
      <div className="bg-muted rounded-3xl min-h-[calc(100vh-1rem)] overflow-hidden shadow-xl">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/30 rounded-t-3xl">
          <div className="max-w-7xl mx-auto px-6 py-3">
            {/* Single row - Logo, Search Bar, and Actions */}
            <div className="flex items-center gap-6">
              {/* Brand Name with Gradient */}
              <button onClick={handleLogoClick} className="flex-shrink-0">
                <span 
                  className="text-2xl font-bold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  InfinityHub
                </span>
              </button>

              {/* Search Bar - Flexible width */}
              <form onSubmit={handleSearch} className="flex-1 flex justify-center">
                <div className="relative w-full max-w-2xl">
                  {/* Glassy gray border - always visible */}
                  <div className="absolute -inset-2 rounded-[50px] bg-muted/40 backdrop-blur-sm border border-border/50" />
                  {/* Aurora gradient glow - only on focus */}
                  <div className={`absolute -inset-[8px] rounded-[52px] blur-md transition-opacity duration-500 ${isFocused ? 'opacity-60' : 'opacity-0'}`} style={{
                  background: 'conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)'
                }} />
                  {/* Aurora gradient border - only on focus */}
                  <div className={`absolute -inset-[3px] rounded-[47px] transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`} style={{
                  background: 'conic-gradient(from 0deg, #0081CF, #FFD700, #FF6FD8, #9B59B6, #00ffbf, #0081CF)'
                }} />
                  {/* Search input container */}
                  <div className="relative flex items-center bg-muted rounded-[45px] shadow-lg border border-border/30">
                    <input type="text" value={localSearchQuery} onChange={e => setLocalSearchQuery(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder={searchQuery || "Ask anything..."} className="flex-1 px-6 py-3 bg-transparent rounded-[45px] text-foreground placeholder:text-muted-foreground focus:outline-none text-sm" />
                    {localSearchQuery ? <button type="button" onClick={() => setLocalSearchQuery("")} className="p-2.5 mr-2 rounded-full bg-[#0081CF] text-white transition-all hover:bg-[#006bb3] shadow-[0_0_15px_rgba(0,129,207,0.5)]">
                        <X className="w-4 h-4" />
                      </button> : <button type="button" className="p-2.5 mr-2 rounded-full bg-white transition-all">
                        <Mic className="w-4 h-4 text-gray-500 opacity-70" />
                      </button>}
                  </div>
                </div>
              </form>

              {/* Right section */}
              <div className="flex items-center gap-4 flex-shrink-0">
                {/* Pincode */}
                <Popover open={pincodeOpen} onOpenChange={setPincodeOpen}>
                  <PopoverTrigger asChild>
                    <div className="flex items-center gap-2 px-4 py-2 min-w-[140px] bg-muted/50 rounded-full border border-border/50 hover:bg-muted transition-colors cursor-pointer">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div className="text-left">
                        <p className="text-[10px] text-muted-foreground leading-none">Deliver to</p>
                        <p className="text-xs font-medium text-foreground">{pincode}</p>
                      </div>
                      <ChevronDown className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-3 bg-background border border-border shadow-lg z-50" align="start">
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-foreground">Enter your pincode</p>
                      <Input
                        type="text"
                        placeholder="Enter pincode"
                        value={pincodeInput}
                        onChange={(e) => setPincodeInput(e.target.value)}
                        className="h-9"
                        maxLength={6}
                      />
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          if (pincodeInput.trim()) {
                            setPincode(pincodeInput.trim());
                            setPincodeOpen(false);
                            setPincodeInput("");
                          }
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
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
          </div>
        </header>

        {/* Content */}
        <div className="max-w-[1800px] mx-auto pl-2 pr-2 pt-2 pb-6">
          <div className="flex gap-2">
            {/* Main Content */}
            <div className="flex-1">
              {/* Results Section with Filters or Promo View */}
              <div className="bg-background rounded-3xl p-6 shadow-sm animate-slide-up delay-200 h-[calc(100vh-6rem)] flex flex-col overflow-hidden">
                {showPromoView ? (
                  /* Promo Landing View */
                  <div className="flex-1 overflow-y-auto pr-1 scrollbar-sleek">
                    <PromoLandingContent onCategoryClick={handleCategoryClick} />
                  </div>
                ) : (
                  /* Products View */
                  <>
                    {/* Filter Bar */}
                    <div className="flex items-center justify-center gap-2 mb-6 flex-wrap flex-shrink-0">
                      <FilterDropdown label="Category" value={filterCategory} options={categoryOptions} onChange={setFilterCategory} />
                      <FilterDropdown label="Rating" value={filterRating} options={ratingOptions} onChange={setFilterRating} />
                      <FilterDropdown label="Gender" value={filterGender} options={genderOptions} onChange={setFilterGender} />
                      <FilterDropdown label="Size" value={filterSize} options={sizeOptions} onChange={setFilterSize} />
                      <FilterDropdown label="Color" value={filterColor} options={colorOptions} onChange={setFilterColor} />
                      <FilterDropdown label="Price" value={filterPrice} options={priceOptions} onChange={setFilterPrice} />
                      <FilterDropdown label="Sort by" value={sortBy} options={sortOptions} onChange={setSortBy} />
                      {(filterCategory || filterRating || filterGender || filterSize || filterColor || filterPrice || sortBy) && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="rounded-full text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => {
                            setFilterCategory("");
                            setFilterRating("");
                            setFilterGender("");
                            setFilterSize("");
                            setFilterColor("");
                            setFilterPrice("");
                            setSortBy("");
                          }}
                        >
                          <X className="w-3 h-3 mr-1" />
                          Clear All
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4 flex-shrink-0">
                      <h2 className="font-semibold text-foreground font-sans capitalize text-base">
                        {filterCategory || categoryFilter || searchQuery || "All Products"}
                        <span className="ml-2 text-sm font-normal text-muted-foreground">({filteredProducts.length} products)</span>
                      </h2>
                      <button className="text-sm text-primary hover:underline flex items-center gap-1">
                        View All <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Products Grid - Scrollable */}
                    <div className="flex-1 overflow-y-auto pr-1 scrollbar-sleek">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {visibleProducts.map((product, index) => <ProductCardNew key={product.id} product={product} index={index} />)}
                      </div>

                      {/* Infinite scroll trigger */}
                      {hasMore && (
                        <div ref={loadMoreRef} className="flex justify-center py-6">
                          {isLoading && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                              <span className="text-sm">Loading more...</span>
                            </div>
                          )}
                        </div>
                      )}

                      {!hasMore && filteredProducts.length > 0 && (
                        <div className="text-center py-4 text-sm text-muted-foreground">
                          All {filteredProducts.length} products loaded
                        </div>
                      )}

                      {filteredProducts.length === 0 && <div className="text-center py-16">
                          <p className="text-muted-foreground text-lg">No products found</p>
                          <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
                        </div>}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* AI Chat Panel */}
            {isChatOpen && (
              <div className="hidden lg:block w-[420px] flex-shrink-0 animate-slide-in-right">
                <div className="sticky top-2 bg-background rounded-3xl shadow-sm relative h-[calc(100vh-6rem)] flex flex-col">
                  <button 
                    onClick={() => setIsChatOpen(false)}
                    className="absolute top-3 right-3 z-10 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  {/* Header */}
                  <div className="p-4 pb-3 flex flex-col items-center text-center">
                    {/* AI Icon with sparkles and glow */}
                    <div className="relative mb-0 pt-1 pb-2 px-6">
                      {/* Glow effect behind Ai text */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 blur-2xl opacity-60 animate-[pulse_3s_ease-in-out_infinite]" style={{
                        background: 'conic-gradient(from 0deg, #0081CF, #00ffbf, #FFD700, #FF6FD8, #9B59B6, #0081CF)'
                      }} />
                      <span className="relative z-10 text-4xl font-bold font-serif text-center bg-clip-text text-transparent" style={{
                        backgroundImage: 'linear-gradient(180deg, #00D4AA 0%, #0081CF 50%, #9B59B6 100%)'
                      }}>Ai</span>
                      {/* Sparkles */}
                      <svg className="absolute -top-1 -right-3 w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="url(#sparkle-gradient)" />
                        <path d="M19 14L19.75 16.25L22 17L19.75 17.75L19 20L18.25 17.75L16 17L18.25 16.25L19 14Z" fill="url(#sparkle-gradient-2)" />
                        <defs>
                          <linearGradient id="sparkle-gradient" x1="4" y1="2" x2="20" y2="18" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#0081CF" />
                            <stop offset="0.5" stopColor="#FFD700" />
                            <stop offset="1" stopColor="#9B59B6" />
                          </linearGradient>
                          <linearGradient id="sparkle-gradient-2" x1="16" y1="14" x2="22" y2="20" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00ffbf" />
                            <stop offset="1" stopColor="#0081CF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <h3 className="font-medium text-foreground text-base font-sans">AI-Powered</h3>
                    <p className="text-xs text-muted-foreground">Shopping Experience</p>
                  </div>

                  {/* Chat Content - Scrollable */}
                  <div className="flex-1 overflow-y-auto px-4 space-y-3">
                    {chatMessages.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        <p>Ask me anything about products!</p>
                        <p className="text-xs mt-1">Try: "Show me electronics" or "I need sports gear"</p>
                      </div>
                    )}
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                          msg.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-foreground'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                          {msg.options && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {msg.options.map((option, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleOptionClick(option)}
                                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-background text-foreground border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input - Fixed at Bottom */}
                  <div className="p-4 pt-3 mt-auto">
                    <ChatInputWithSubmit onSubmit={handleChatSubmit} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Chat Button */}
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 z-50 group transition-transform hover:scale-110 animate-[bounce_1s_ease-in-out]"
          >
            {/* Soft glow effect */}
            <div className="absolute inset-0 rounded-full blur-xl opacity-60 animate-[pulse_2s_ease-in-out_infinite]" style={{
              background: 'linear-gradient(135deg, #FFB6C1, #DDA0DD, #87CEEB)'
            }} />
            
            {/* Cute Kawaii Chatbot Icon */}
            <svg className="w-[72px] h-[72px] relative z-10" viewBox="0 0 72 72" fill="none" style={{ filter: 'drop-shadow(0 4px 8px rgba(255,182,193,0.4))' }}>
              <defs>
                {/* Soft pastel gradient */}
                <linearGradient id="kawaiiBody" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFB6C1" />
                  <stop offset="50%" stopColor="#DDA0DD" />
                  <stop offset="100%" stopColor="#87CEEB" />
                </linearGradient>
                {/* Blush gradient */}
                <radialGradient id="blush" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FF9999" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FF9999" stopOpacity="0" />
                </radialGradient>
                {/* Shine highlight */}
                <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Main bubble body */}
              <path d="M10 28 C10 14 22 6 36 6 C50 6 62 14 62 28 L62 40 C62 54 50 62 36 62 L28 62 L20 70 L20 62 C14 60 10 52 10 40 Z" fill="url(#kawaiiBody)" />
              
              {/* Shine highlight */}
              <ellipse cx="26" cy="18" rx="12" ry="6" fill="url(#shine)" />
              
              {/* Cute ears/antenna */}
              <circle cx="20" cy="10" r="6" fill="#DDA0DD" />
              <circle cx="52" cy="10" r="6" fill="#87CEEB" />
              <circle cx="20" cy="10" r="3" fill="#ffffff" opacity="0.5" />
              <circle cx="52" cy="10" r="3" fill="#ffffff" opacity="0.5" />
              
              {/* Eyes - big and cute */}
              <ellipse cx="26" cy="32" rx="6" ry="7" fill="#2D2D2D" />
              <ellipse cx="46" cy="32" rx="6" ry="7" fill="#2D2D2D" />
              
              {/* Eye sparkles */}
              <circle cx="28" cy="29" r="2.5" fill="#ffffff" />
              <circle cx="48" cy="29" r="2.5" fill="#ffffff" />
              <circle cx="24" cy="33" r="1.5" fill="#ffffff" opacity="0.7" />
              <circle cx="44" cy="33" r="1.5" fill="#ffffff" opacity="0.7" />
              
              {/* Blush cheeks */}
              <ellipse cx="16" cy="40" rx="5" ry="3" fill="url(#blush)" />
              <ellipse cx="56" cy="40" rx="5" ry="3" fill="url(#blush)" />
              
              {/* Cute smile */}
              <path d="M30 46 Q36 52 42 46" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              
              {/* Small sparkles around */}
              <g fill="#FFD700" opacity="0.8">
                <path d="M8 24 L10 26 L8 28 L6 26 Z" />
                <path d="M64 24 L66 26 L64 28 L62 26 Z" />
                <path d="M36 2 L37 4 L36 6 L35 4 Z" />
              </g>
              
              {/* Heart accent */}
              <path d="M58 52 C58 50 60 48 62 50 C64 48 66 50 66 52 C66 56 62 58 62 58 C62 58 58 56 58 52" fill="#FF6B8A" opacity="0.8" />
            </svg>
          </button>
        )}
      </div>
    </div>;
}