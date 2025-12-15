import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Package, Truck, CheckCircle, MapPin, Clock, Phone, ArrowLeft, Box, Home } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface TrackingStep {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
  current: boolean;
  icon: React.ReactNode;
}

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-2024-001234";

  // Mock order data
  const orderData = {
    id: orderId,
    status: "In Transit",
    estimatedDelivery: "December 18, 2024",
    carrier: "Express Delivery",
    trackingNumber: "TRK9876543210",
    items: [
      {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
        quantity: 1,
        price: 79.99,
      },
      {
        id: "2",
        name: "Smart Watch Pro",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
        quantity: 1,
        price: 199.99,
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      phone: "+1 (555) 123-4567",
    },
  };

  const trackingSteps: TrackingStep[] = [
    {
      id: "1",
      title: "Order Placed",
      description: "Your order has been confirmed",
      date: "Dec 14, 2024",
      time: "10:30 AM",
      completed: true,
      current: false,
      icon: <Box className="w-5 h-5" />,
    },
    {
      id: "2",
      title: "Order Processed",
      description: "Your order is being prepared",
      date: "Dec 14, 2024",
      time: "2:45 PM",
      completed: true,
      current: false,
      icon: <Package className="w-5 h-5" />,
    },
    {
      id: "3",
      title: "Shipped",
      description: "Package handed to carrier",
      date: "Dec 15, 2024",
      time: "9:15 AM",
      completed: true,
      current: false,
      icon: <Truck className="w-5 h-5" />,
    },
    {
      id: "4",
      title: "In Transit",
      description: "Package is on the way to your address",
      date: "Dec 16, 2024",
      time: "11:00 AM",
      completed: false,
      current: true,
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: "5",
      title: "Delivered",
      description: "Package delivered to your doorstep",
      date: "Dec 18, 2024",
      time: "Expected",
      completed: false,
      current: false,
      icon: <Home className="w-5 h-5" />,
    },
  ];

  const completedSteps = trackingSteps.filter((step) => step.completed).length;
  const progressPercentage = (completedSteps / trackingSteps.length) * 100;

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="container max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="mb-4 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Track Your Order</h1>
                <p className="text-muted-foreground mt-1">Order ID: {orderData.id}</p>
              </div>
              <Badge
                variant="secondary"
                className="w-fit bg-amber-100 text-amber-800 border-amber-200"
              >
                <Truck className="w-4 h-4 mr-1" />
                {orderData.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Tracking Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Estimated Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-foreground mb-4">
                    {orderData.estimatedDelivery}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Progress</span>
                      <span className="font-medium">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Tracking Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {trackingSteps.map((step, index) => (
                      <div key={step.id} className="flex gap-4 pb-8 last:pb-0">
                        {/* Timeline line */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                              step.completed
                                ? "bg-green-500 border-green-500 text-white"
                                : step.current
                                ? "bg-amber-500 border-amber-500 text-white animate-pulse"
                                : "bg-muted border-muted-foreground/30 text-muted-foreground"
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              step.icon
                            )}
                          </div>
                          {index < trackingSteps.length - 1 && (
                            <div
                              className={`w-0.5 flex-1 mt-2 ${
                                step.completed ? "bg-green-500" : "bg-muted-foreground/30"
                              }`}
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <h3
                              className={`font-semibold ${
                                step.completed || step.current
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {step.title}
                            </h3>
                            <span className="text-sm text-muted-foreground">
                              {step.date} • {step.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {step.description}
                          </p>
                          {step.current && (
                            <Badge variant="outline" className="mt-2 text-amber-600 border-amber-300">
                              Current Status
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Shipping Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Carrier</p>
                    <p className="font-medium">{orderData.carrier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tracking Number</p>
                    <p className="font-mono text-sm">{orderData.trackingNumber}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Delivery Address</p>
                    <div className="text-sm">
                      <p className="font-medium">{orderData.shippingAddress.name}</p>
                      <p>{orderData.shippingAddress.street}</p>
                      <p>
                        {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{" "}
                        {orderData.shippingAddress.zip}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {orderData.shippingAddress.phone}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Order Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Help Section */}
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-3">Need help with your order?</p>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderTracking;
