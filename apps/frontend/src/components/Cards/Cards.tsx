import { IProduct } from '../../../../../domain/dist';

interface CardsProps {
  dataProduct: IProduct[];
}

const Cards = ({ dataProduct }: CardsProps) => {
  return (
    <div>
      {dataProduct.map((p) => (
        <div className="card" key={p.title}>
          <div className="card-body">
            <h1>{p.title}</h1>
            <h2>$ {p.price}</h2>
            {p.stock === false ? (
              <div className="alert alert-warning">Out of stock</div>
            ) : (
              <button>Add to cart</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
