
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import CartSidebar from "../components/CartSidebar";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-3xl font-bold mb-3">Featured Products</h2>
            <div className="w-24 h-1 bg-accent rounded mb-4"></div>
            <p className="text-muted-foreground max-w-2xl">
              Discover our carefully curated selection of premium products at competitive prices
            </p>
          </div>
          
          <ProductGrid />
        </div>
        
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Free Shipping</h2>
                <p className="text-muted-foreground mb-6">
                  Enjoy free shipping on all orders over $50. Shop now and experience 
                  the convenience of doorstep delivery without additional costs.
                </p>
                <button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Promotional Image</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <CartSidebar />
      <ChatBot />
    </div>
  );
};

export default Index;
