import express from "express";
import { Request, Response } from "express";
import { router as authRouter } from "../routes/auth-router";
import { router as productsRouter } from "../routes/products-router";
import { router as cartRouter } from "../routes/cart-router"

export function createApp(db: any) {
  const app = express();

  app.use(express.json());

  app.use('/cart', cartRouter)
  app.use('/products', productsRouter)
  app.use('/auth', authRouter)

  app.get('/', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ ok: 'Hola' });
  })

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}