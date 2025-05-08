
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import ProductCard from "./ProductCard";
import { Product, products, categories } from "../data/products";

const ProductGrid = () => {
  const [searchParams] = useSearchParams();
  const [displayProducts, setDisplayProducts] = useState<Product[]>(products);
  const [sortOption, setSortOption] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  
  const categoryParam = searchParams.get("category");
  
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (categoryParam && categoryParam !== "All") {
      filtered = filtered.filter(product => product.category === categoryParam);
    }
    
    // Sort products
    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setDisplayProducts(filtered);
  }, [categoryParam, sortOption]);
  
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">
          {categoryParam && categoryParam !== "All" 
            ? categoryParam 
            : "All Products"}
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({displayProducts.length} products)
          </span>
        </h2>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
          
          <Select
            defaultValue={sortOption}
            onValueChange={setSortOption}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {showFilters && (
        <div className="md:hidden mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <a
                key={index}
                href={category === "All" ? "/" : `/?category=${category}`}
                className={`px-3 py-1 text-sm rounded-full ${
                  categoryParam === category
                    ? "bg-amazon-accent text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {displayProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-gray-500">Try changing your filters or search term</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
