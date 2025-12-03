import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "@/data/products";

const heroSlides = [
  {
    id: 1,
    title: "Trending",
    subtitle: "E-Commerce",
    description: "Discover the latest trends",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    link: "/?category=fashion",
  },
  {
    id: 2,
    title: "Smart",
    subtitle: "Electronics",
    description: "Latest gadgets & tech",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800",
    link: "/?category=electronics",
  },
  {
    id: 3,
    title: "Home",
    subtitle: "Essentials",
    description: "Transform your space",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    link: "/?category=home",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative bg-gradient-to-br from-muted via-background to-secondary/30 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          {/* Left Title Section */}
          <div className="lg:col-span-3 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
              <span className="text-gradient">{heroSlides[currentSlide].title}</span>
              <br />
              {heroSlides[currentSlide].subtitle}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              {heroSlides[currentSlide].description}
            </p>
            <Link
              to={heroSlides[currentSlide].link}
              className="inline-block mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-105"
            >
              Shop Now
            </Link>
          </div>

          {/* Carousel Cards */}
          <div className="lg:col-span-9 relative">
            <div className="flex gap-4 overflow-hidden">
              {categories.slice(0, 4).map((category, index) => (
                <Link
                  key={category.id}
                  to={`/?category=${category.id}`}
                  className={`relative flex-shrink-0 w-[200px] md:w-[240px] h-[280px] md:h-[320px] rounded-2xl overflow-hidden group transition-all duration-500 ${
                    index === currentSlide ? "scale-105 z-10" : "scale-100 opacity-80"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-card/20 backdrop-blur-md text-primary-foreground text-xs font-medium rounded-full">
                      FEATURED
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-primary-foreground font-bold text-xl mb-1">
                      {category.name}
                    </h3>
                    <p className="text-primary-foreground/70 text-sm">
                      Explore Collection
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-card rounded-full shadow-card flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-card rounded-full shadow-card flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
