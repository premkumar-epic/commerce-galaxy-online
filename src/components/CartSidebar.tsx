
import { ShoppingCart, X } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import CartItem from "./CartItem";
import { useCart } from "../context/CartContext";

const CartSidebar = () => {
  const { cart, toggleCart, isCartOpen, totalItems, totalPrice, clearCart } = useCart();
  
  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleCart}
        />
      )}
      
      {/* Cart sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <ShoppingCart size={20} className="mr-2" />
              <h3 className="font-semibold">
                Your Cart 
                <span className="ml-1 text-sm text-gray-500">
                  ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </span>
              </h3>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="text-gray-500"
            >
              <X size={20} />
            </Button>
          </div>
          
          {/* Cart items */}
          <div className="flex-grow overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingCart size={48} strokeWidth={1} className="mb-2" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-1">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between mb-4 text-lg font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <Button className="w-full bg-amazon-accent hover:bg-amazon-accent/90">
                Checkout
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
