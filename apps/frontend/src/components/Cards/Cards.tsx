import { useState } from 'react';
import { IProduct } from '../../../../../domain/dist';

interface CardsProps {
  dataProduct: IProduct[];
}

const Cards = ({ dataProduct }: CardsProps) => {
  const [error, setError] = useState<string | null>(null)
  const [exitMessage, setExitMessage]= useState<string | null>(null)
  const addToCart = async (id: string)=> {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}/cart/addProductToCart/${id}`)

      const data = await response.json()

      if(!data.ok){
        setError(data.error)
      }

      setExitMessage('ProductAddedToCart')
    } catch (error) {
      setError('Internal server error')
    }
  }

  return (
    <div>
      {exitMessage && <div className="alert alert-success"> {exitMessage} </div> }
      {error && <div className="alert alert-danger">{error}</div> }
      {dataProduct.map((p) => (
        <div className="card" key={p.title}>
          <div className="card-body">
            <h1>{p.title}</h1>
            <h2>$ {p.price}</h2>
            {p.stock === false ? (
              <div className="alert alert-warning">Out of stock</div>
            ) : (
              <button onClick={(()=> addToCart(p.id))}>Add to cart</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
