
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, ChevronRight, Truck, Shield, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { products, Product } from "../data/products";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data from an API
    setLoading(true);
    setTimeout(() => {
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-96 mb-6 rounded-lg"></div>
          <div className="bg-gray-200 h-8 w-3/4 mb-4 rounded"></div>
          <div className="bg-gray-200 h-6 w-1/4 mb-6 rounded"></div>
          <div className="bg-gray-200 h-4 mb-2 rounded"></div>
          <div className="bg-gray-200 h-4 mb-2 rounded"></div>
          <div className="bg-gray-200 h-4 mb-6 rounded"></div>
          <div className="bg-gray-200 h-12 w-48 rounded"></div>
        </div>
      </div>
    );
  }
  
  // Not found state
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you are looking for does not exist.</p>
        <Button onClick={() => navigate("/")}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }
  
  // Render product
  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-4 flex items-center">
          <a href="/" className="hover:text-amazon-accent">Home</a>
          <ChevronRight size={16} className="mx-2" />
          <a href={`/?category=${product.category}`} className="hover:text-amazon-accent">
            {product.category}
          </a>
          <ChevronRight size={16} className="mx-2" />
          <span className="truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product image */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto object-contain"
              style={{ maxHeight: "500px" }}
            />
          </div>
        </div>
        
        {/* Product details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={20}
                className={`${
                  index < Math.floor(product.rating)
                    ? "text-amazon-accent fill-amazon-accent"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.price > 25 && (
              <span className="ml-2 text-sm text-gray-600">
                + Free Shipping
              </span>
            )}
          </div>
          
          {/* Stock status */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <div className="text-green-600 font-medium">
                In Stock - {product.stock} available
              </div>
            ) : (
              <div className="text-red-600 font-medium">Out of Stock</div>
            )}
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {/* Quantity and add to cart */}
          <div className="flex items-center gap-4 mb-6">
            <div>
              <label htmlFor="quantity" className="block text-sm text-gray-600 mb-1">
                Quantity
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amazon-accent"
              >
                {[...Array(Math.min(10, product.stock))].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            
            <Button
              onClick={handleAddToCart}
              className="h-12 bg-amazon-accent hover:bg-amazon-accent/90 flex-grow md:flex-grow-0 md:px-10"
              disabled={product.stock === 0}
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
          </div>
          
          {/* Delivery and guarantee */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex gap-3">
              <Truck size={20} className="text-gray-600" />
              <div>
                <p className="font-medium">Fast Delivery</p>
                <p className="text-sm text-gray-600">Get it by {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Shield size={20} className="text-gray-600" />
              <div>
                <p className="font-medium">Satisfaction Guaranteed</p>
                <p className="text-sm text-gray-600">30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
