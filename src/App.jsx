import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./Components/common/cards/ProductCard";
import ProductLoadingCard from "./Components/common/cards/ProductLoadingCard";
import { useNavigate } from "react-router-dom";

function App() {
  const [products, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const loading = [1, 2, 3, 4, 5, 6, 7, 8];
  const navigate = useNavigate();

  // Fetch product
  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.products);
        setLoading(false);
      });
  }, []);

  // Handle product details
  const handleProductDetails = (product) => {
    console.log("product", product);
    navigate("/product-details", { state: product });
  };

  return (
    <main className="flex justify-center items-center flex-col">
      <section>
        <h1 className="text-center text-2xl font-bold m-5 text-blue-900">
          This is Product section!!
        </h1>
        {isLoading ? (
          <div className="grid grid-cols-4 gap-5">
            {loading.map((load, index) => (
              <ProductLoadingCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-5">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                image={product.images[0]}
                price={product.price}
                handleProductDetails={() => handleProductDetails(product)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
