import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const product = products.find((p) => p.id === id);

  // Get product-specific sizes and colors
  const sizes = product?.sizes || [];
  const colors = product?.colors || [];

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate("/")}>Go back home</Button>
        </div>
      </Layout>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  // Generate background color based on category
  const categoryBgColors: Record<string, string> = {
    electronics: "bg-amber-200",
    fashion: "bg-rose-200",
    home: "bg-emerald-200",
    sports: "bg-blue-200",
    books: "bg-orange-200",
    beauty: "bg-purple-200",
  };

  const bgColor = categoryBgColors[product.category] || "bg-secondary";

  // Get the selected color's image if available
  const selectedColorData = colors.find(c => c.hex === selectedColor);
  const colorImage = selectedColorData?.image;

  // Generate gallery images - prioritize color image, then product.images, then fallback
  const galleryImages = colorImage 
    ? [colorImage, ...(product.images?.filter(img => img !== colorImage) || [product.image])]
    : product.images?.length 
      ? product.images 
      : [
          product.image,
          product.image.replace("w=600", "w=601"),
          product.image.replace("w=600", "w=602"),
          product.image.replace("w=600", "w=603"),
        ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Main Product Section - Fits viewport */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 min-h-[calc(100vh-180px)]">
          {/* Product Image Gallery */}
          <div className="animate-fade-in h-full flex items-center">
            <div className="w-full h-full max-h-[500px] lg:max-h-[600px]">
              <ProductImageGallery
                images={galleryImages}
                productName={product.name}
                discount={discount}
                bgColor={bgColor}
              />
            </div>
          </div>

          {/* Product Info - Scrollable if needed */}
          <div className="flex flex-col justify-center space-y-4 animate-fade-in lg:max-h-[600px] lg:overflow-y-auto lg:pr-2 scrollbar-thin">
            {/* Category & Title */}
            <div>
              <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-2xl lg:text-3xl font-display font-bold mt-1 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted fill-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-foreground font-semibold">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Size</span>
                  {selectedSize && (
                    <span className="text-xs text-muted-foreground">{selectedSize}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-[40px] h-9 px-3 rounded-lg border-2 font-medium text-xs transition-all",
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary/50"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Color</span>
                  {selectedColor && (
                    <span className="text-xs text-muted-foreground">
                      {colors.find(c => c.hex === selectedColor)?.name}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color.hex)}
                      className={cn(
                        "w-8 h-8 rounded-full relative transition-all",
                        selectedColor === color.hex
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "hover:scale-110"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {color.hex === "#FFFFFF" && (
                        <span className="absolute inset-0 rounded-full border border-border" />
                      )}
                      {selectedColor === color.hex && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className={cn(
                              "w-4 h-4",
                              color.hex === "#FFFFFF" || color.hex === "#C0C0C0" || color.hex === "#D4AF37" || color.hex === "#D4C4A8" || color.hex === "#E3BC9A" || color.hex === "#F5F5DC"
                                ? "text-foreground"
                                : "text-white"
                            )}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Features - Compact */}
            {product.features && (
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs bg-muted px-3 py-1.5 rounded-full text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-border rounded-full bg-card">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-semibold text-sm">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                className="flex-1 h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="h-11 px-6 rounded-xl font-semibold text-sm border-2"
              >
                Buy Now
              </Button>
            </div>

            {/* Trust badges - Compact */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              {[
                { icon: Truck, text: "Free Shipping" },
                { icon: Shield, text: "2 Year Warranty" },
                { icon: RotateCcw, text: "30-Day Returns" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-muted-foreground">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {(() => {
          const similarProducts = products.filter(
            (p) => p.category === product.category && p.id !== product.id
          ).slice(0, 4);
          
          if (similarProducts.length === 0) return null;
          
          return (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">Similar Products</h2>
                <Link 
                  to={`/?category=${product.category}`}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View All
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similarProducts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="group relative bg-secondary rounded-2xl overflow-hidden aspect-square transition-transform hover:scale-[1.02]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-medium text-sm line-clamp-1">{item.name}</p>
                      <p className="text-white/80 text-sm font-bold">${item.price.toFixed(2)}</p>
                    </div>
                    <button 
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/product/${item.id}`);
                      }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-foreground" />
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </Layout>
  );
};

export default ProductDetail;
