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

  // Available sizes and colors based on category
  const sizeOptions: Record<string, string[]> = {
    fashion: ["XS", "S", "M", "L", "XL", "XXL"],
    sports: ["S", "M", "L", "XL"],
    electronics: ["32GB", "64GB", "128GB", "256GB"],
    home: ["Small", "Medium", "Large"],
    beauty: ["30ml", "50ml", "100ml"],
    books: ["Paperback", "Hardcover", "E-book"],
  };

  const colorOptions: Record<string, { name: string; hex: string }[]> = {
    electronics: [
      { name: "Space Gray", hex: "#4A4A4A" },
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Gold", hex: "#D4AF37" },
      { name: "Midnight", hex: "#1C1C1E" },
    ],
    fashion: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#1E3A5F" },
      { name: "Red", hex: "#C41E3A" },
      { name: "Beige", hex: "#D4C4A8" },
    ],
    sports: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Blue", hex: "#2563EB" },
      { name: "Red", hex: "#DC2626" },
    ],
    home: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Gray", hex: "#6B7280" },
      { name: "Brown", hex: "#8B4513" },
      { name: "Green", hex: "#22C55E" },
    ],
    beauty: [
      { name: "Rose", hex: "#FF007F" },
      { name: "Coral", hex: "#FF7F50" },
      { name: "Nude", hex: "#E3BC9A" },
    ],
    books: [],
  };

  const sizes = sizeOptions[product?.category || ""] || [];
  const colors = colorOptions[product?.category || ""] || [];

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

  // Generate gallery images - use product.images if available, otherwise create variations
  const galleryImages = product.images?.length 
    ? product.images 
    : [
        product.image,
        product.image.replace("w=600", "w=601"), // Slight variation for demo
        product.image.replace("w=600", "w=602"),
        product.image.replace("w=600", "w=603"),
      ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image Gallery */}
          <div className="animate-fade-in-up">
            <ProductImageGallery
              images={galleryImages}
              productName={product.name}
              discount={discount}
              bgColor={bgColor}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-5 animate-fade-in-up delay-200">
            <div>
              <span className="text-sm text-primary font-semibold uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold mt-2 leading-tight">
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
                      "w-5 h-5",
                      i < Math.floor(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted fill-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-foreground font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-base">
              {product.description}
            </p>

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Size</span>
                  {selectedSize && (
                    <span className="text-sm text-muted-foreground">Selected: {selectedSize}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-[48px] h-10 px-4 rounded-lg border-2 font-medium text-sm transition-all",
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
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Color</span>
                  {selectedColor && (
                    <span className="text-sm text-muted-foreground">
                      {colors.find(c => c.hex === selectedColor)?.name}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color.hex)}
                      className={cn(
                        "w-10 h-10 rounded-full relative transition-all",
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
                              "w-5 h-5",
                              color.hex === "#FFFFFF" || color.hex === "#C0C0C0" || color.hex === "#D4AF37" || color.hex === "#D4C4A8" || color.hex === "#E3BC9A"
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

            {/* Features */}
            {product.features && (
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Features</h3>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-medium text-foreground">Quantity:</span>
              <div className="flex items-center border border-border rounded-full bg-card">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-2">
              <Button
                className="flex-1 h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="h-14 px-8 rounded-xl font-semibold text-base border-2"
              >
                Buy Now
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              {[
                { icon: Truck, text: "Free Shipping" },
                { icon: Shield, text: "2 Year Warranty" },
                { icon: RotateCcw, text: "30-Day Returns" },
              ].map((item) => (
                <div key={item.text} className="text-center">
                  <item.icon className="w-7 h-7 mx-auto text-primary mb-2" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
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
