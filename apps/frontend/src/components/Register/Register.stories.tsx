import type { Meta, StoryObj } from '@storybook/react';
import Register from './Register';

const meta: Meta<typeof Register> = {
    title: 'UI/Register',
    component: Register,
    parameters: {
        layout: 'centered'
    }
}

export default meta

type Story = StoryObj<typeof Register> 

export const RegisterStory: Story = {
    args:{
    labels: ['Email', 'Password', 'Name'],
    txtForBtn: 'Register',
    urlAction: `${import.meta.env.BASE_URL}/auth/register`,
    method: 'POST'
    }
}