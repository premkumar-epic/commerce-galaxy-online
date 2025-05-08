
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { CartItem as CartItemType, useCart } from "../context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { id, name, price, image, quantity } = item;
  
  return (
    <div className="flex gap-4 py-4 border-b border-gray-200">
      <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain" 
        />
      </div>
      
      <div className="flex-grow">
        <h4 className="font-medium text-sm line-clamp-2">{name}</h4>
        <div className="text-lg font-semibold mt-1">${price.toFixed(2)}</div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={() => updateQuantity(id, quantity - 1)}
            >
              <Minus size={14} />
            </Button>
            
            <span className="mx-2 w-8 text-center">{quantity}</span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={() => updateQuantity(id, quantity + 1)}
            >
              <Plus size={14} />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-500 hover:text-red-500"
            onClick={() => removeFromCart(id)}
          >
            <Trash size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
