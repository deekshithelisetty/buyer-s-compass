import { ArrowRight, Truck, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-10" />
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              🔥 New Arrivals
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Discover Your
              <span className="text-gradient block">Perfect Style</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Shop the latest trends with unbeatable prices. Free shipping on orders over $50.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/?category=fashion">
                  Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/?category=electronics">
                  Explore Electronics
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in-up delay-200">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 hero-gradient rounded-full blur-3xl opacity-20 animate-pulse-glow" />
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                alt="Shopping experience"
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl"
              />
              {/* Floating badges */}
              <div className="absolute -left-4 top-1/4 bg-card p-3 rounded-xl shadow-card animate-bounce-subtle">
                <span className="text-2xl">🎁</span>
                <p className="text-xs font-medium mt-1">50% Off</p>
              </div>
              <div className="absolute -right-4 bottom-1/4 bg-card p-3 rounded-xl shadow-card animate-bounce-subtle delay-300">
                <span className="text-2xl">⭐</span>
                <p className="text-xs font-medium mt-1">Top Rated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
            { icon: Shield, title: "Secure Payment", desc: "100% protected" },
            { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
          ].map((item, index) => (
            <div
              key={item.title}
              className="flex items-center gap-4 p-4 bg-card rounded-xl card-shadow animate-fade-in-up"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg hero-gradient flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
