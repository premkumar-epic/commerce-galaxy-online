
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, User } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";
import { categories } from "../data/products";

const Header = () => {
  const { toggleCart, totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top navigation bar */}
      <div className="bg-amazon-primary text-white px-4 py-2">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tighter">
            eCommerce
          </Link>
          
          {/* Search bar */}
          <div className="hidden md:flex flex-1 mx-4 relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-l-md rounded-r-none border-0"
            />
            <Button
              className="rounded-l-none rounded-r-md bg-amazon-yellow hover:bg-amazon-yellow/90 text-black"
              size="icon"
            >
              <Search size={20} />
            </Button>
          </div>
          
          {/* Right navigation links */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="hidden md:flex items-center text-sm hover:text-amazon-yellow">
              <User size={20} className="mr-1" />
              <div>
                <div className="text-xs text-gray-300">Hello, Sign In</div>
                <div>Account</div>
              </div>
            </Link>
            
            <Link to="/" className="hidden md:flex items-center text-sm hover:text-amazon-yellow">
              <div>
                <div className="text-xs text-gray-300">Returns</div>
                <div>& Orders</div>
              </div>
            </Link>
            
            <button
              onClick={toggleCart}
              className="flex items-center hover:text-amazon-yellow relative"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amazon-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
              <span className="ml-1 hidden md:inline">Cart</span>
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Categories navigation */}
      <div className="bg-amazon-secondary text-white px-4 py-2 shadow-md">
        <div className="container mx-auto flex items-center overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category === "All" ? "/" : `/?category=${category}`}
              className="whitespace-nowrap px-3 py-1 text-sm hover:text-amazon-yellow"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Mobile search (visible on small screens) */}
      <div className="md:hidden bg-amazon-primary text-white px-4 py-2">
        <div className="flex relative">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-l-md rounded-r-none border-0"
          />
          <Button
            className="rounded-l-none rounded-r-md bg-amazon-yellow hover:bg-amazon-yellow/90 text-black"
            size="icon"
          >
            <Search size={20} />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-amazon-secondary text-white px-4 py-2 absolute w-full">
          <Link
            to="/"
            className="block py-2 hover:text-amazon-yellow"
            onClick={() => setMobileMenuOpen(false)}
          >
            Account
          </Link>
          <Link
            to="/"
            className="block py-2 hover:text-amazon-yellow"
            onClick={() => setMobileMenuOpen(false)}
          >
            Orders
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
