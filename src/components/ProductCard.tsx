
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { id, name, price, image, rating, reviews } = product;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <Link
      to={`/product/${id}`}
      className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative pt-[75%] bg-gray-100">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-contain p-4"
        />
        {product.stock < 5 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Only {product.stock} left
          </span>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{name}</h3>
        
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              className={`${
                index < Math.floor(rating)
                  ? "text-amazon-accent fill-amazon-accent"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-sm text-gray-600">({reviews})</span>
        </div>
        
        <div className="mt-auto">
          <div className="text-xl font-bold mb-3">${price.toFixed(2)}</div>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-amazon-yellow hover:bg-amazon-yellow/90 text-black"
          >
            <ShoppingCart size={18} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
