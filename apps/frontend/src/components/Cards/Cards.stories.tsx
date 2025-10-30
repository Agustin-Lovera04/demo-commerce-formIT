import type { Meta, StoryObj } from "@storybook/react";
import Cards from "./Cards";

const meta: Meta<typeof Cards> = {
  title: 'UI/Cards',
  component: Cards,
  parameters:{
    layout: 'centered'
  }
};

export default meta

type Story = StoryObj<typeof Cards>;

export const ProductWithStock : Story = {
    args:{ 
        dataProduct: [
            {
            id: 'ID1',
            title: 'Prod 1',
            price: 100,
            stock: true
            }
        ]
    }
}

export const ProductOutStock : Story = {
    args:{ 
        dataProduct: [
            {
            id: 'ID1',
            title: 'Prod 1',
            price: 100,
            stock: false
            }
        ]
    }
}