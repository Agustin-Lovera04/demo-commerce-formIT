import Cards, { CardsProps } from "../Cards/Cards"

const Home = ({dataProduct}: CardsProps) => {
  return (
    <div>
        <h1>Welcome!</h1>
        <Cards dataProduct={dataProduct}/>
    </div>
  )
}

export default Home