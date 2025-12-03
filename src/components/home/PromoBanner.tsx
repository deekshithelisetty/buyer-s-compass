import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function PromoBanner() {
  return (
    <section className="py-6 bg-background">
      <div className="container mx-auto px-4">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          {/* Main Promo Card */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 dark:from-amber-900/30 dark:via-orange-900/20 dark:to-yellow-900/30 p-5 md:p-6 min-h-[240px] md:min-h-[300px] group">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground leading-tight">
                  Summer<br />
                  Arrival of<br />
                  Outfit
                </h2>
                <p className="text-muted-foreground mt-2 max-w-xs text-sm">
                  Discover quality fashion that reflects your style.
                </p>
              </div>
              <Link
                to="/?category=fashion"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full font-medium text-sm w-fit hover:bg-foreground/90 transition-all hover:scale-105 mt-4"
              >
                Explore Product
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Discount Badge */}
            <div className="absolute top-4 right-4 text-right">
              <span className="text-4xl md:text-5xl font-bold text-foreground">50%</span>
              <span className="block text-sm text-muted-foreground">OFF</span>
            </div>
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
              alt="Summer Fashion"
              className="absolute right-0 bottom-0 w-2/5 h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Model Card */}
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden min-h-[140px] group">
            <img
              src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=800"
              alt="Fashion Model"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-foreground/20" />
            <Link
              to="/?category=fashion"
              className="absolute bottom-3 right-3 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trendy Sunglasses Card */}
          <div className="relative rounded-2xl overflow-hidden bg-cyan-100 dark:bg-cyan-900/30 p-4 min-h-[120px] group">
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-foreground">Trendy</h3>
              <p className="text-muted-foreground text-sm">Sunglass</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"
              alt="Sunglasses"
              className="absolute right-0 bottom-0 w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-500"
            />
            <Link
              to="/?category=fashion"
              className="absolute bottom-3 right-3 w-8 h-8 bg-card/80 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Popular Shoes Card */}
          <div className="relative rounded-2xl overflow-hidden bg-rose-100 dark:bg-rose-900/30 p-4 min-h-[120px] group">
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-foreground">Popular</h3>
              <p className="text-muted-foreground text-sm">Shoes</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
              alt="Shoes"
              className="absolute right-0 bottom-0 w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-500"
            />
            <Link
              to="/?category=sports"
              className="absolute bottom-3 right-3 w-8 h-8 bg-card/80 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
