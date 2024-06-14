import { Card } from "flowbite-react";
import ProductDetailCard from "../../Components/common/cards/ProductDetailCard";
import { useLocation } from "react-router-dom";
// import { useLocation } from "react-router-dom";

export function ProductDetails() {
  const location = useLocation();
  const product = location.state;
  console.log("location: " + location.state);
  return (
    <div className="flex justify-center items-center h-screen ">
      <ProductDetailCard
        image={product.images[0]}
        title={product.title}
        description={product.description}
        price={product.price}
      />
    </div>
  );
}
