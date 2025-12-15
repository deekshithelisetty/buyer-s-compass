import { useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  discount?: number;
  bgColor?: string;
}

export function ProductImageGallery({ 
  images, 
  productName, 
  discount, 
  bgColor = "bg-secondary" 
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className={cn("relative aspect-square rounded-3xl overflow-hidden", bgColor)}>
        <img
          src={images[selectedIndex]}
          alt={`${productName} - View ${selectedIndex + 1}`}
          className="w-full h-full object-contain p-8 transition-opacity duration-300"
        />
        
        {/* Discount Badge */}
        {discount && discount > 0 && (
          <span className="absolute top-5 left-5 bg-destructive text-destructive-foreground text-sm font-bold px-4 py-2 rounded-xl shadow-lg">
            -{discount}% OFF
          </span>
        )}
        
        {/* Wishlist Button */}
        <button
          className="absolute top-5 right-5 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center transition-all hover:scale-110"
        >
          <Heart className="w-6 h-6 text-muted-foreground hover:text-destructive transition-colors" />
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 shadow-lg flex items-center justify-center transition-all hover:scale-110 hover:bg-card"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 shadow-lg flex items-center justify-center transition-all hover:scale-110 hover:bg-card"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden transition-all duration-200",
                selectedIndex === index
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105"
                  : "opacity-60 hover:opacity-100 hover:scale-105"
              )}
            >
              <div className={cn("absolute inset-0", bgColor)} />
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="relative w-full h-full object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
