
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, User } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";
import { categories } from "../data/products";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "./ui/navigation-menu";

const Header = () => {
  const { toggleCart, totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top navigation bar */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight">
            ShopHub
          </Link>
          
          {/* Search bar */}
          <div className="hidden md:flex flex-1 mx-6 relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border-0 pl-4 pr-12 focus-within:ring-2 focus-within:ring-accent/50"
            />
            <Button
              className="absolute right-0 rounded-full w-10 h-10 p-0 bg-accent hover:bg-accent/90 text-white"
              size="icon"
            >
              <Search size={18} />
            </Button>
          </div>
          
          {/* Right navigation links */}
          <div className="flex items-center space-x-5">
            <Link to="/" className="hidden md:flex items-center text-sm hover:text-accent group">
              <User size={20} className="mr-2 group-hover:text-accent transition-colors" />
              <div>
                <div className="text-xs text-white/80">Hello, Sign In</div>
                <div>Account</div>
              </div>
            </Link>
            
            <Link to="/" className="hidden md:flex items-center text-sm hover:text-accent">
              <div>
                <div className="text-xs text-white/80">View</div>
                <div>Orders</div>
              </div>
            </Link>
            
            <button
              onClick={toggleCart}
              className="flex items-center hover:text-accent relative transition-colors"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
              <span className="ml-2 hidden md:inline">Cart</span>
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
      <div className="bg-secondary/95 backdrop-blur-sm text-white px-4 py-2 shadow-md">
        <div className="container mx-auto">
          <NavigationMenu className="mx-auto max-w-full justify-start">
            <NavigationMenuList className="hidden md:flex overflow-x-auto gap-1">
              {categories.map((category, index) => (
                <NavigationMenuItem key={index}>
                  <Link
                    to={category === "All" ? "/" : `/?category=${category}`}
                    className="text-sm px-3 py-2 rounded-md hover:bg-white/10 transition-colors block whitespace-nowrap"
                  >
                    {category}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Mobile categories - horizontal scroll */}
          <div className="md:hidden flex overflow-x-auto scrollbar-none gap-2 py-1">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category === "All" ? "/" : `/?category=${category}`}
                className="text-sm px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors whitespace-nowrap flex-shrink-0"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile search (visible on small screens) */}
      <div className="md:hidden bg-primary/95 text-white px-4 py-2">
        <div className="flex relative">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-full border-0 pl-4 pr-12"
          />
          <Button
            className="absolute right-0 rounded-full w-9 h-9 p-0 bg-accent hover:bg-accent/90 text-white"
            size="icon"
          >
            <Search size={16} />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-secondary/95 backdrop-blur-md text-white px-4 py-2 absolute w-full">
          <Link
            to="/"
            className="block py-2 hover:text-accent"
            onClick={() => setMobileMenuOpen(false)}
          >
            Account
          </Link>
          <Link
            to="/"
            className="block py-2 hover:text-accent"
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
