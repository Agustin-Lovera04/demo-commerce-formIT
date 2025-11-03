import { Meta, StoryObj } from "@storybook/react";
import CreateProduct from "./CreateProduct";

const meta: Meta<typeof CreateProduct> = {
    title: 'UI/CreateProduct',
    component: CreateProduct,
    parameters: {
        layout: 'centered'
    }
}

export default meta

type Story = StoryObj<typeof CreateProduct>

export const CreateProducts : Story = {
    args: {
        labels: ['Title', 'Stock', 'Price'],
        txtForBtn: 'Create product',
        urlAction: `${import.meta.env.BASE_URL}/products/createProduct`,
        method: 'POST'
    }
}