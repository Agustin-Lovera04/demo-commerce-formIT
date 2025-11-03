import { Meta, StoryObj } from "@storybook/react";
import EditProduct from "./EditProduct";

const meta: Meta<typeof EditProduct> = {
    title: 'UI/EditProduct',
    component: EditProduct,
    parameters: {
        layout: 'centered'
    }
}

export default meta

type Story = StoryObj<typeof EditProduct>

export const EditProducts : Story = {
    args: {
        labels: ['Title', 'Stock', 'Price'],
        txtForBtn: 'Edit product',
        urlAction: `${import.meta.env.BASE_URL}/products/editProduct`,
        method: 'POST',
        id: 'ID1'
    }
}