import { ArrowRight, Sparkles, Zap, Gift, Truck, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-background via-background to-secondary/50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-particle"
            style={{
              left: `${10 + (i * 6)}%`,
              top: `${15 + (i * 5)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[65vh]">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary animate-fade-in-up backdrop-blur-sm">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>New Season Collection 2024</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] animate-fade-in-up delay-100">
              Discover
              <span className="block text-gradient animate-gradient">Extraordinary</span>
              <span className="block">Shopping</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg animate-fade-in-up delay-200">
              Experience premium quality products with lightning-fast delivery. 
              Your style, your way, delivered to your doorstep.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <Button variant="hero" size="xl" asChild className="group">
                <Link to="/?category=fashion">
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="backdrop-blur-sm border-primary/20 hover:bg-primary/10">
                <Link to="/?category=electronics">
                  Explore Deals
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 animate-fade-in-up delay-400">
              {[
                { value: "50K+", label: "Products" },
                { value: "10K+", label: "Customers" },
                { value: "99%", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative lg:h-[550px] animate-fade-in-up delay-200">
            {/* Main image container */}
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-[3rem] transform rotate-3 scale-95 blur-xl" />
              <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-[2.5rem] p-6 border border-border/50 shadow-2xl h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                  alt="Shopping experience"
                  className="w-full h-full object-cover rounded-2xl"
                />
                
                {/* Floating cards */}
                <div className="absolute -left-6 top-1/4 bg-card/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-border/50 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 hero-gradient rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Flash Sale</p>
                      <p className="text-sm text-muted-foreground">Up to 70% Off</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 top-1/3 bg-card/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-border/50 animate-float-delayed">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Gift className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Free Gifts</p>
                      <p className="text-sm text-muted-foreground">On $100+ Orders</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-2 left-1/4 bg-card/90 backdrop-blur-xl p-3 rounded-xl shadow-xl border border-border/50 animate-bounce-subtle">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-card" />
                      ))}
                    </div>
                    <p className="text-sm font-medium text-foreground">+2.5K Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
            { icon: Shield, title: "Secure Payment", desc: "100% protected" },
            { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
          ].map((item, index) => (
            <div
              key={item.title}
              className="flex items-center gap-4 p-5 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 card-shadow hover:card-hover-shadow transition-all duration-300 animate-fade-in-up group"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
}
