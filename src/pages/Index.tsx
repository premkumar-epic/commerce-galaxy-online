
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import CartSidebar from "../components/CartSidebar";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-8">
          <ProductGrid />
        </div>
      </main>
      
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default Index;
