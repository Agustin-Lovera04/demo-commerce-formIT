import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BuyOrder from "../BuyOrder/BuyOrder"

const BuyOrderContainer = () => {
  const { id } = useParams()
  const [order, setOrder] = useState<any>(null)
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/buyOrder/getOrder/${id}`, {
          method: "GET",
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error("Failed to fetch order")
        }

        const result = await response.json()
        setOrder(result.ok)
      } catch {
        setError("Internal server error")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <div className="alert alert-danger">{error}</div>
  if (!order) return <p>No order found</p>

  return <BuyOrder products={order.products} />
}

export default BuyOrderContainer
