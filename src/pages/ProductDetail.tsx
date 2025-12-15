import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus, ArrowUpRight, Heart, Share2, MapPin, Check } from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
      <div className="container mx-auto px-4 py-4">
        {/* Main Product Section - 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          
          {/* LEFT: Thumbnails + Main Image */}
          <div className="lg:col-span-5 flex gap-3">
            {/* Vertical Thumbnails */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              {galleryImages.slice(0, 6).map((image, index) => (
                <button
                  key={index}
                  onMouseEnter={() => setSelectedImageIndex(index)}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "w-12 h-12 rounded-lg overflow-hidden border-2 transition-all",
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative">
              <div className="aspect-square bg-background border border-border rounded-lg overflow-hidden">
                <img
                  src={galleryImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              {/* Share button */}
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
                <Share2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* CENTER: Product Details */}
          <div className="lg:col-span-4 space-y-4">
            {/* Title */}
            <h1 className="text-xl lg:text-2xl font-semibold leading-tight text-foreground">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-primary font-medium">{product.rating}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <span className="text-primary hover:underline cursor-pointer">
                ({product.reviews.toLocaleString()})
              </span>
            </div>

            {/* Limited Deal Badge */}
            {discount > 0 && (
              <span className="inline-block bg-destructive text-destructive-foreground text-xs font-semibold px-2.5 py-1 rounded">
                Limited time deal
              </span>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2">
              {discount > 0 && (
                <span className="text-destructive text-xl font-medium">-{discount}%</span>
              )}
              <span className="text-3xl font-medium text-foreground">
                ${product.price.toFixed(2)}
              </span>
            </div>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground">
                M.R.P.: <span className="line-through">${product.originalPrice.toFixed(2)}</span>
              </p>
            )}

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
              {product.description}
            </p>

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-sm font-medium text-foreground">Size: {selectedSize || "Select"}</span>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-[48px] h-10 px-4 rounded border text-sm transition-all",
                        selectedSize === size
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-foreground hover:border-primary"
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
              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-sm font-medium text-foreground">
                  Color: {colors.find(c => c.hex === selectedColor)?.name || "Select"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color.hex)}
                      className={cn(
                        "w-10 h-10 rounded border-2 relative transition-all",
                        selectedColor === color.hex
                          ? "border-primary"
                          : "border-border hover:border-primary/50"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {color.hex === "#FFFFFF" && (
                        <span className="absolute inset-0 rounded border border-border" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && (
              <div className="border-t border-border pt-4">
                <h3 className="text-sm font-medium text-foreground mb-2">Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust Badges */}
            <div className="flex items-center gap-6 border-t border-border pt-4">
              {[
                { icon: Shield, text: "3 Year Warranty" },
                { icon: RotateCcw, text: "10 days Returnable" },
                { icon: Truck, text: "Free Delivery" },
              ].map((item) => (
                <div key={item.text} className="flex flex-col items-center gap-1 text-center">
                  <item.icon className="w-6 h-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Buy Box */}
          <div className="lg:col-span-3">
            <div className="border border-border rounded-lg p-4 space-y-4 sticky top-4">
              {/* Price in buy box */}
              <div className="text-2xl font-medium text-foreground">
                ${product.price.toFixed(2)}
              </div>

              {/* Delivery info */}
              <div className="text-sm space-y-1">
                <p className="text-muted-foreground">
                  FREE delivery <span className="font-medium text-foreground">Tomorrow</span>
                </p>
                <p className="flex items-center gap-1 text-primary text-xs">
                  <MapPin className="w-3 h-3" />
                  Deliver to your location
                </p>
              </div>

              {/* Stock status */}
              <p className={cn(
                "text-lg font-medium",
                product.inStock ? "text-green-600" : "text-destructive"
              )}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>

              {/* Quantity selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Qty:</span>
                <div className="flex items-center border border-border rounded bg-muted/50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                <Button
                  className="w-full h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  className="w-full h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-medium"
                  onClick={() => {
                    addToCart(product);
                    if (isAuthenticated) {
                      navigate("/checkout?step=address");
                    } else {
                      navigate("/auth?redirect=/checkout?step=address");
                    }
                  }}
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
              </div>

              {/* Wishlist */}
              <button className="flex items-center gap-2 text-sm text-primary hover:underline w-full justify-center pt-2 border-t border-border">
                <Heart className="w-4 h-4" />
                Add to Wish List
              </button>

              {/* Seller info */}
              <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border">
                <p className="flex justify-between">
                  <span>Ships from</span>
                  <span className="text-foreground">InfinityHub</span>
                </p>
                <p className="flex justify-between">
                  <span>Sold by</span>
                  <span className="text-foreground">InfinityHub</span>
                </p>
                <p className="flex justify-between">
                  <span>Payment</span>
                  <span className="text-foreground">Secure transaction</span>
                </p>
              </div>
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
            <div className="mt-12 border-t border-border pt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Similar Products</h2>
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
                    className="group border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-muted/30 p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                      <p className="text-lg font-bold text-foreground mt-1">${item.price.toFixed(2)}</p>
                    </div>
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
