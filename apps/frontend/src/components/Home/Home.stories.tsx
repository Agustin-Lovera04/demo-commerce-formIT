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

export const HomeClient: Story = {}