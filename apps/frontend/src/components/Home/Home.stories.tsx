import { Meta , StoryObj } from "@storybook/react";
import Home from "./Home";

const meta : Meta<typeof Home> = {
    title: "UI/Home",
    component: Home,
    parameters:{
        layout: 'fullscreen'
    }
}

export default meta

type Story = StoryObj<typeof Home>

export const HomeClient: Story = {
    args:{
        dataProduct: [
            {
            id: 'ID1',
            title: 'Prod 1',
            price: 100,
            stock: true
            },
                        {
            id: 'ID2',
            title: 'Prod 2',
            price: 400,
            stock: true
            },
            {
            id: 'ID3',
            title: 'Prod 3',
            price: 1300,
            stock: false
            }
        ]

    }
}