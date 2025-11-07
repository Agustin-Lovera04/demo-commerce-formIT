import { useState } from "react";
import { IProduct } from "../../../../../domain/dist";
import { useUser } from "../../Context/UserContext";

export interface CardsProps {
  dataProduct: IProduct[];
}

const Cards = ({ dataProduct }: CardsProps) => {
  const { isLoggedIn } = useUser();

  const [error, setError] = useState<string | null>(null);
  const [exitMessage, setExitMessage] = useState<string | null>(null);

  const addToCart = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/cart/addProduct/${id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!data.ok) {
        setExitMessage(null);
        setError(data.error);
        return;
      }

      setExitMessage("Producto agregado al carrito");
      setError(null);
    } catch (error) {
      setExitMessage(null);
      setError("Internal server error");
    }
  };

  return (
    <div>
      {exitMessage && <div className="alert alert-success">{exitMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {dataProduct.map((p) => (
        <div className="card" key={p.title}>
          <div className="card-body">
            <h1>{p.title}</h1>
            <h2>$ {p.price}</h2>

            {p.stock === false ? (
              <div className="alert alert-warning">Out of stock</div>
            ) : !isLoggedIn ? (
              <button disabled className="btn btn-secondary">
                Debes iniciar sesión
              </button>
            ) : (
              <button
                onClick={() => addToCart(p.id)}
                className="btn btn-primary"
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
