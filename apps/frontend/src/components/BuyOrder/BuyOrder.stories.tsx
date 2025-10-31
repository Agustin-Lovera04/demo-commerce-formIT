import { Meta, StoryObj } from "@storybook/react";
import BuyOrder from "./BuyOrder";

const meta: Meta<typeof BuyOrder> = {
    title: 'UI/BuyOrder',
    component: BuyOrder,
    parameters: {
        layout: 'centered'
    }
}

export default meta

type Story = StoryObj<typeof BuyOrder>

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