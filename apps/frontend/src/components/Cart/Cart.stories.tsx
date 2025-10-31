import { Meta, StoryObj } from "@storybook/react";
import Cart from "./Cart";

const meta: Meta<typeof Cart> = {
    title: 'UI/Cart',
    component: Cart,
    parameters: {
        layout: 'centered'
    }
}

export default meta

type Story = StoryObj<typeof Cart>

export const CartWithProducts : Story = {
    args: {
    products: [
        {
            product: 'Prod1',
            quantity: 2,
            price: 100,
            subtotal: 200
        },
        {
            product: 'Prod2',
            quantity: 1,
            price: 400,
            subtotal: 400
        }
        ]
    }
}