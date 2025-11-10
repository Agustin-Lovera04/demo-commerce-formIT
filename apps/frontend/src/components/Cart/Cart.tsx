import { useState } from "react";
import { IProductCartItem } from "../../../../../domain/dist";
import Button from "../Button/Button";
import TableCart from "../TableCart/TableCart";
import { useNavigate } from "react-router-dom";

interface DataForCart {
  products: IProductCartItem[];
}

const Cart = ({ products }: DataForCart) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async () => {
    setError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/buyOrder/genOrder`,
        {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const result = await response.json();
      if (result?.ok?.id) {
        navigate(`/buyOrder/${result.ok.id}`);
      } else {
        setError("Order ID not found");
      }
    } catch {
      setError("Internal server error");
    }
  };
  return (
    <>
      <h1>Cart</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <TableCart products={products} />
      <div className="d-flex gap-2 mt-3">
        <Button
          label="Buy"
          variant="success"
          type="button"
          onClick={handleBuy}
        />
      </div>
    </>
  );
};

export default Cart;
