import HeroSlider from "./components/ui/HeroSlider";
import CategorySlider from "./components/ui/Categories";
import ProductCollection from "./components/ui/ProductCollection";
import Products from "./components/ui/Products";
import CosmeticsCollection from "./components/ui/CosmeticsCollection";
import CustomerReviews from "./components/ui/CustomerReviews";




export default function Home() {
  return (
    <main>
      <HeroSlider />

      <CategorySlider />

      <ProductCollection />

      <Products />

      <CosmeticsCollection />

      <CustomerReviews />

    
    </main>
  );
}