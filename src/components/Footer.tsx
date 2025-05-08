
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold mb-4 text-lg">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-accent hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-accent hover:underline transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-accent hover:underline transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg">Sell with Us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-accent hover:underline transition-colors">
                  Sell on ShopHub
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-accent hover:underline transition-colors">
                  Become an Affiliate
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-accent hover:underline transition-colors">
                  Advertise Your Products
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg">Payment Options</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-accent hover:underline transition-colors">
                  Credit Cards
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-accent hover:underline transition-colors">
                  Shop with Points
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-accent hover:underline transition-colors">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg">Help Center</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-accent hover:underline transition-colors">
                  Your Account
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-accent hover:underline transition-colors">
                  Your Orders
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-accent hover:underline transition-colors">
                  Shipping Policies
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-accent hover:underline transition-colors">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter subscription */}
        <div className="bg-secondary/40 rounded-xl p-6 mb-12 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold">Subscribe to our newsletter</h4>
              <p className="text-sm text-white/70">Get the latest deals and more.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address"
                className="px-4 py-2 rounded-l-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-accent flex-1 md:w-64"
              />
              <button className="bg-accent hover:bg-accent/90 transition-colors text-white font-medium px-4 py-2 rounded-r-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <div className="text-2xl font-bold mb-2">ShopHub</div>
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} All rights reserved. ShopHub is a demo e-commerce site.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
