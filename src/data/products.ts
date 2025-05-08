
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  stock: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Canceling Headphones",
    description: "Premium wireless headphones with active noise cancellation, perfect for music lovers and commuters. Enjoy crystal-clear sound and comfort for hours.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 1254,
    category: "Electronics",
    stock: 25,
    featured: true
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    description: "Track your health and fitness goals with this advanced fitness tracker. Features include heart rate monitoring, sleep tracking, and waterproof design.",
    price: 99.95,
    image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviews: 829,
    category: "Electronics",
    stock: 42
  },
  {
    id: "3",
    name: "Ultra HD Smart TV - 55\"",
    description: "Transform your home entertainment with this stunning 4K Ultra HD Smart TV. Access streaming services, gaming, and more with built-in smart features.",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 432,
    category: "Electronics",
    stock: 12,
    featured: true
  },
  {
    id: "4",
    name: "Professional Blender",
    description: "High-performance blender for smoothies, soups, and more. Powerful motor can handle even the toughest ingredients with ease.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.5,
    reviews: 368,
    category: "Home & Kitchen",
    stock: 30
  },
  {
    id: "5",
    name: "Ergonomic Office Chair",
    description: "Work in comfort with this adjustable ergonomic chair. Features lumbar support, breathable mesh back, and adjustable height.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.4,
    reviews: 215,
    category: "Furniture",
    stock: 18
  },
  {
    id: "6",
    name: "Bestselling Fiction Novel",
    description: "The latest page-turner from a renowned author. This gripping story will keep you engaged from beginning to end.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 723,
    category: "Books",
    stock: 56
  },
  {
    id: "7",
    name: "Portable Bluetooth Speaker",
    description: "Take your music anywhere with this water-resistant, portable Bluetooth speaker. Features 12-hour battery life and stunning sound quality.",
    price: 89.95,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.5,
    reviews: 492,
    category: "Electronics",
    stock: 38
  },
  {
    id: "8",
    name: "Professional DSLR Camera",
    description: "Capture stunning photos and videos with this professional-grade DSLR camera. Includes multiple lenses and accessories.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 189,
    category: "Electronics",
    stock: 8,
    featured: true
  }
];

export const categories = [
  "All",
  "Electronics",
  "Home & Kitchen",
  "Furniture",
  "Books",
  "Clothing",
  "Sports & Outdoors"
];
