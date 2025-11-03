import { Meta, StoryObj } from "@storybook/react";
import DeleteProduct from "./DeleteProduct";

const meta: Meta<typeof DeleteProduct> = {
    title: 'UI/DeleteProduct',
    component: DeleteProduct,
    parameters: {
        layout: 'centered'
    }
}

export default meta

type Story = StoryObj<typeof DeleteProduct>

export const DeleteProducts : Story = {
    args: {
        labels: ['id'],
        txtForBtn: 'Delete product',
        urlAction: `${import.meta.env.BASE_URL}/products/deleteProduct`,
        method: 'POST',
        id: 'ID1'
    }
}