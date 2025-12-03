import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function PromoBanner() {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Main Promo Card */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden bg-gradient-to-br from-secondary via-muted to-secondary/80 p-6 md:p-8 min-h-[300px] md:min-h-[400px] group">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight">
                  Summer<br />
                  Arrival of<br />
                  Outfit
                </h2>
                <p className="text-muted-foreground mt-4 max-w-xs">
                  Discover quality fashion that reflects your style and makes everyday enjoyable.
                </p>
              </div>
              <Link
                to="/?category=fashion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium w-fit hover:bg-foreground/90 transition-all hover:scale-105 mt-6"
              >
                Explore Product
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Discount Badge */}
            <div className="absolute top-6 right-6 text-right">
              <span className="text-5xl md:text-6xl font-bold text-foreground">50%</span>
              <span className="block text-lg text-muted-foreground">OFF</span>
            </div>
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
              alt="Summer Fashion"
              className="absolute right-0 bottom-0 w-1/2 h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Model Card */}
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden min-h-[200px] group">
            <img
              src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=800"
              alt="Fashion Model"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-foreground/20" />
            <Link
              to="/?category=fashion"
              className="absolute bottom-4 right-4 w-12 h-12 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Trendy Sunglasses Card */}
          <div className="relative rounded-3xl overflow-hidden bg-secondary p-5 min-h-[160px] group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-foreground">Trendy</h3>
              <p className="text-muted-foreground">Sunglass</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"
              alt="Sunglasses"
              className="absolute right-0 bottom-0 w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-500"
            />
            <Link
              to="/?category=fashion"
              className="absolute bottom-4 right-4 w-10 h-10 bg-card/80 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Popular Shoes Card */}
          <div className="relative rounded-3xl overflow-hidden bg-muted p-5 min-h-[160px] group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-foreground">Popular</h3>
              <p className="text-muted-foreground">Shoes</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
              alt="Shoes"
              className="absolute right-0 bottom-0 w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-500"
            />
            <Link
              to="/?category=sports"
              className="absolute bottom-4 right-4 w-10 h-10 bg-card/80 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
