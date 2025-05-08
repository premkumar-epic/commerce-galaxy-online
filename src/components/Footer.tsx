
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-amazon-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Back to top button */}
        <div className="flex justify-center mb-8">
          <a 
            href="#top" 
            className="bg-amazon-secondary hover:bg-amazon-secondary/90 py-3 px-6 text-sm text-center w-full"
          >
            Back to top
          </a>
        </div>
        
        {/* Footer links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:underline">
                  Press Releases
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Make Money with Us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:underline">
                  Sell on eCommerce
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:underline">
                  Become an Affiliate
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:underline">
                  Advertise Your Products
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Payment Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:underline">
                  Shop with Points
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:underline">
                  Credit Card
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:underline">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:underline">
                  Your Account
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:underline">
                  Your Orders
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:underline">
                  Shipping Rates & Policies
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:underline">
                  Returns & Replacements
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white hover:underline">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <div className="text-xl font-bold mb-2">eCommerce</div>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} All rights reserved. This is a demo e-commerce site.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
