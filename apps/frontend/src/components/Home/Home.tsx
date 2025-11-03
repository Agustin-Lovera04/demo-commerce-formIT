import Cards, { CardsProps } from "../Cards/Cards"

const Home = ({dataProduct}: CardsProps) => {
  return (
    <div>
        <nav> navbar </nav>
        <main>
            <Cards dataProduct={dataProduct}/>
        </main>
    </div>
  )
}

export default Home