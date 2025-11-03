import Cards from "../Cards/Cards";

const CardsList = () => {
  const dataProduct = [
    {
      id: "ID1",
      title: "Prod 1",
      price: 100,
      stock: true,
    },
    {
      id: "ID2",
      title: "Prod 2",
      price: 200,
      stock: false,
    },
  ];

  return (
    <div>
      <Cards dataProduct={dataProduct} />
    </div>
  );
};

export default CardsList;
