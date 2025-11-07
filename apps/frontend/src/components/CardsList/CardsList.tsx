import { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import { IProduct } from "../../../../../domain/dist";

const CardsList = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/products/getAllProducts`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!data.products) {
          setError(data.error);
          setLoading(false);
          return;
        }
        setProducts(data.products);
      } catch (error) {
        setError("Internal server error");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <div >Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <Cards dataProduct={products} />
      )}
    </div>
  );
};

export default CardsList;
