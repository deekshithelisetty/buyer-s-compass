import { useState } from "react";
import { Heart, ChevronUp, ChevronDown } from "lucide-react";
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
    <div className="flex gap-4 h-full">
      {/* Vertical Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 relative">
          {images.length > 4 && (
            <button
              onClick={handlePrevious}
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-card shadow-md flex items-center justify-center z-10 hover:bg-muted transition-colors"
            >
              <ChevronUp className="w-4 h-4 text-foreground" />
            </button>
          )}
          <div className="flex flex-col gap-2 max-h-[400px] overflow-hidden py-1">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden transition-all duration-200 flex-shrink-0",
                  selectedIndex === index
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "opacity-50 hover:opacity-100"
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
          {images.length > 4 && (
            <button
              onClick={handleNext}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-card shadow-md flex items-center justify-center z-10 hover:bg-muted transition-colors"
            >
              <ChevronDown className="w-4 h-4 text-foreground" />
            </button>
          )}
        </div>
      )}

      {/* Main Image */}
      <div className={cn("relative flex-1 rounded-2xl overflow-hidden", bgColor)}>
        <div className="aspect-square h-full w-full flex items-center justify-center">
          <img
            src={images[selectedIndex]}
            alt={`${productName} - View ${selectedIndex + 1}`}
            className="max-w-full max-h-full object-contain p-6 transition-all duration-300"
          />
        </div>
        
        {/* Discount Badge */}
        {discount && discount > 0 && (
          <span className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
            -{discount}%
          </span>
        )}
        
        {/* Wishlist Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all hover:scale-110 group"
        >
          <Heart className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors" />
        </button>
      </div>
    </div>
  );
}
