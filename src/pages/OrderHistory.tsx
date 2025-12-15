import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Package, ChevronDown, ChevronUp, RotateCcw, Eye, Star, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing" | "Cancelled";
  total: number;
  items: OrderItem[];
  deliveryDate?: string;
}

// Mock order history data
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "INF-K8M3X-Y2P4",
    date: "December 10, 2024",
    status: "Delivered",
    total: 279.98,
    deliveryDate: "December 14, 2024",
    items: [
      {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
        price: 79.99,
        quantity: 1,
        category: "Electronics",
      },
      {
        id: "2",
        name: "Smart Watch Pro",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
        price: 199.99,
        quantity: 1,
        category: "Electronics",
      },
    ],
  },
  {
    id: "2",
    orderNumber: "INF-P9N2K-R7Q1",
    date: "November 28, 2024",
    status: "Delivered",
    total: 149.97,
    deliveryDate: "December 2, 2024",
    items: [
      {
        id: "3",
        name: "Classic Leather Jacket",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
        price: 149.97,
        quantity: 1,
        category: "Fashion",
      },
    ],
  },
  {
    id: "3",
    orderNumber: "INF-T5L8W-H3M6",
    date: "November 15, 2024",
    status: "Delivered",
    total: 459.96,
    deliveryDate: "November 19, 2024",
    items: [
      {
        id: "4",
        name: "Ultra HD 4K Monitor",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop",
        price: 399.99,
        quantity: 1,
        category: "Electronics",
      },
      {
        id: "5",
        name: "Wireless Mouse",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
        price: 59.97,
        quantity: 1,
        category: "Electronics",
      },
    ],
  },
  {
    id: "4",
    orderNumber: "INF-A2C7B-X9D4",
    date: "October 30, 2024",
    status: "Cancelled",
    total: 89.99,
    items: [
      {
        id: "6",
        name: "Running Sneakers",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
        price: 89.99,
        quantity: 1,
        category: "Fashion",
      },
    ],
  },
];

const OrderHistory = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [expandedOrders, setExpandedOrders] = useState<string[]>([mockOrders[0]?.id]);

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          rating: 4.5,
          reviews: 100,
          inStock: true,
        });
      }
    });
    toast({
      title: "Items added to cart",
      description: `${order.items.length} item(s) from order ${order.orderNumber} added to your cart.`,
    });
  };

  const handleReorderSingleItem = (item: OrderItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      rating: 4.5,
      reviews: 100,
      inStock: true,
    });
    toast({
      title: "Item added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Transit":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Sign in to view your orders</h1>
            <p className="text-muted-foreground mb-8">
              Track orders, view order history, and reorder your favorite items.
            </p>
            <Button
              className="bg-amber-400 hover:bg-amber-500 text-foreground font-medium"
              size="lg"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="mb-4 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Your Orders</h1>
            <p className="text-muted-foreground mt-1">
              {mockOrders.length} orders placed
            </p>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {mockOrders.map((order) => {
              const isExpanded = expandedOrders.includes(order.id);
              
              return (
                <Card key={order.id} className="overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-muted/50 px-4 py-3 border-b border-border">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs uppercase">Order Placed</p>
                          <p className="font-medium">{order.date}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs uppercase">Total</p>
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs uppercase">Order #</p>
                          <p className="font-mono text-xs">{order.orderNumber}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Order Content */}
                  <CardContent className="p-4">
                    {/* Delivery Info */}
                    {order.status === "Delivered" && order.deliveryDate && (
                      <p className="text-sm text-green-600 font-medium mb-4">
                        ✓ Delivered on {order.deliveryDate}
                      </p>
                    )}

                    {/* Items Preview or Full List */}
                    <div className="space-y-4">
                      {(isExpanded ? order.items : order.items.slice(0, 2)).map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg bg-muted cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => navigate(`/product/${item.id}`)}
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className="font-medium text-primary hover:underline cursor-pointer line-clamp-2"
                              onClick={() => navigate(`/product/${item.id}`)}
                            >
                              {item.name}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Qty: {item.quantity} • ${item.price.toFixed(2)}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs"
                                onClick={() => handleReorderSingleItem(item)}
                              >
                                <RotateCcw className="w-3 h-3 mr-1" />
                                Buy it again
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs"
                                onClick={() => navigate(`/product/${item.id}`)}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View item
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Expand/Collapse for orders with more items */}
                    {order.items.length > 2 && (
                      <Button
                        variant="ghost"
                        className="w-full mt-4 text-sm"
                        onClick={() => toggleOrderExpand(order.id)}
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-2" />
                            Show less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-2" />
                            Show all {order.items.length} items
                          </>
                        )}
                      </Button>
                    )}

                    <Separator className="my-4" />

                    {/* Order Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Button
                        className="bg-amber-400 hover:bg-amber-500 text-foreground font-medium"
                        size="sm"
                        onClick={() => handleReorder(order)}
                        disabled={order.status === "Cancelled"}
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reorder all items
                      </Button>
                      {order.status !== "Cancelled" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/order-tracking?orderId=${order.orderNumber}`)}
                        >
                          <Package className="w-4 h-4 mr-2" />
                          Track order
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Star className="w-4 h-4 mr-2" />
                        Leave review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistory;
