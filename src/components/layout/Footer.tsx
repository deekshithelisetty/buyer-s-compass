import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-header text-header-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
                <span className="text-xl font-bold">S</span>
              </div>
              <span className="text-xl font-bold">ShopHub</span>
            </Link>
            <p className="text-sm text-header-foreground/70">
              Your one-stop destination for everything you need. Quality products, competitive prices, and excellent service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-header-foreground/70">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/?category=electronics" className="hover:text-primary transition-colors">Electronics</Link></li>
              <li><Link to="/?category=fashion" className="hover:text-primary transition-colors">Fashion</Link></li>
              <li><Link to="/?category=home" className="hover:text-primary transition-colors">Home & Garden</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-header-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-header-foreground/70 mb-3">
              Subscribe to get special offers and updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-header-foreground/10 border border-header-foreground/20 text-sm placeholder:text-header-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-header-foreground/10 mt-8 pt-8 text-center text-sm text-header-foreground/50">
          <p>© 2024 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
