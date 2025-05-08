
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "New Arrivals",
    subtitle: "Check out our latest products",
    cta: "Shop Now"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    title: "Summer Sale",
    subtitle: "Up to 50% off on selected items",
    cta: "View Offers"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Electronics",
    subtitle: "The latest gadgets and tech",
    cta: "Explore"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full h-72 md:h-96 overflow-hidden">
      {/* Slides */}
      <div 
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className="w-full h-full flex-shrink-0 relative"
            style={{ flex: "0 0 100%" }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
            
            <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
              <Button className="bg-amazon-accent hover:bg-amazon-accent/90 text-white w-fit">
                {slide.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-30 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-30 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
