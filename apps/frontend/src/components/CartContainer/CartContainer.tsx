import { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import { useUser } from "../../Context/UserContext";
import { IProductCartItem } from "../../../../../domain/dist";

const CartContainer = () => {
  const { user, isLoggedIn } = useUser();
  const cartId = user?.cartId;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProductCartItem[]>([]);

  useEffect(() => {
    const getCart = async () => {
      if (!user || !isLoggedIn) return;

      if (!cartId) {
        setError("Not found cart.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/cart/getCart/${cartId}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();

        if (!data?.cart?.products) {
          setError(data.error || "Not found cart.");
          return;
        }

        setProducts(data.cart.products);
      } catch {
        setError("Internal server error.");
      } finally {
        setLoading(false);
      }
    };

    getCart();
  }, [cartId, user, isLoggedIn]);

  if (loading) return <div>Loading...</div>;
  if (!isLoggedIn || !user) return <div>Not found user.</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return <Cart products={products} />;
};

export default CartContainer;
