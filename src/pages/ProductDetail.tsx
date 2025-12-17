import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Truck, RotateCcw, Shield, Award } from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductCardMinimal } from "@/components/product/ProductCardMinimal";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState("1");

  const product = products.find((p) => p.id === id);

  // Get related products
  const relatedProducts = products.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  ).slice(0, 6);

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

  const productImages = [product.image, product.image, product.image, product.image, product.image];

  const handleAddToCart = () => {
    const qty = parseInt(quantity);
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    if (isAuthenticated) {
      navigate("/checkout?step=address");
    } else {
      navigate("/auth?redirect=/checkout?step=address");
    }
  };

  // Delivery date calculation
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const deliveryDateStr = deliveryDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          {/* Main 3-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Image Gallery */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <div className="h-[450px] lg:h-[500px]">
                  <ProductImageGallery
                    images={productImages}
                    productName={product.name}
                    discount={discount}
                  />
                </div>
              </div>
            </div>

            {/* Center: Product Info */}
            <div className="lg:col-span-4 space-y-4">
              {/* Brand/Store Link */}
              <Link to="/" className="text-sm text-primary hover:underline">
                Visit the InfinityHub Store
              </Link>

              {/* Title */}
              <h1 className="text-xl lg:text-2xl font-medium text-foreground leading-tight">
                {product.name} | {product.category} | Premium Quality
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">{product.rating}</span>
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
                  ({product.reviews})
                </span>
                <span className="text-muted-foreground">|</span>
                <span className="text-primary hover:underline cursor-pointer">
                  Search this page
                </span>
              </div>

              {/* Deal Badge */}
              {discount > 0 && (
                <span className="inline-block px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded">
                  Limited time deal
                </span>
              )}

              {/* Price Section */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  {discount > 0 && (
                    <span className="text-destructive text-lg">-{discount}%</span>
                  )}
                  <span className="text-3xl font-medium text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                {product.originalPrice && (
                  <div className="text-sm text-muted-foreground">
                    M.R.P.: <span className="line-through">${product.originalPrice.toFixed(2)}</span>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>
              </div>

              {/* Features Icons */}
              <div className="flex items-center gap-4 py-4 border-y border-border overflow-x-auto">
                <div className="flex flex-col items-center text-center min-w-[70px]">
                  <RotateCcw className="w-6 h-6 text-muted-foreground mb-1" />
                  <span className="text-xs text-primary">10 days Return</span>
                </div>
                <div className="flex flex-col items-center text-center min-w-[70px]">
                  <Truck className="w-6 h-6 text-muted-foreground mb-1" />
                  <span className="text-xs text-primary">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center min-w-[70px]">
                  <Award className="w-6 h-6 text-muted-foreground mb-1" />
                  <span className="text-xs text-primary">Top Brand</span>
                </div>
                <div className="flex flex-col items-center text-center min-w-[70px]">
                  <Shield className="w-6 h-6 text-muted-foreground mb-1" />
                  <span className="text-xs text-primary">Secure</span>
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <span className="text-sm font-medium">Colour: <span className="font-normal">{product.category}</span></span>
                <div className="flex gap-2">
                  <button className="w-16 h-20 rounded-lg border-2 border-primary overflow-hidden">
                    <img src={product.image} alt="Color variant" className="w-full h-full object-cover" />
                  </button>
                  <button className="w-16 h-20 rounded-lg border border-border overflow-hidden opacity-60 hover:opacity-100">
                    <img src={product.image} alt="Color variant" className="w-full h-full object-cover" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 pt-4">
                <h3 className="font-medium">About this item</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Right: Buy Box */}
            <div className="lg:col-span-3">
              <div className="sticky top-24 border border-border rounded-lg p-4 space-y-4 bg-card">
                {/* Price */}
                <div className="text-2xl font-medium text-foreground">
                  ${product.price.toFixed(2)}
                </div>

                {/* Delivery Info */}
                <div className="space-y-1 text-sm">
                  <p className="text-foreground">
                    FREE delivery <span className="font-medium">{deliveryDateStr}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Or fastest delivery Tomorrow
                  </p>
                </div>

                {/* Stock Status */}
                <div className={cn(
                  "text-lg font-medium",
                  product.inStock ? "text-green-600" : "text-red-600"
                )}>
                  {product.inStock ? "In stock" : "Out of Stock"}
                </div>

                {/* Seller Info */}
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ships from</span>
                    <span className="text-foreground">InfinityHub</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sold by</span>
                    <span className="text-primary">InfinityHub Retail</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment</span>
                    <span className="text-primary">Secure transaction</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm">Quantity:</span>
                  <Select value={quantity} onValueChange={setQuantity}>
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    className="w-full h-10 rounded-full bg-amber-400 hover:bg-amber-500 text-foreground"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    className="w-full h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                  >
                    Buy Now
                  </Button>
                </div>

                {/* Wishlist */}
                <Button variant="outline" className="w-full h-9 text-sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Wish List
                </Button>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {relatedProducts.map((item) => (
                  <ProductCardMinimal key={item.id} product={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
