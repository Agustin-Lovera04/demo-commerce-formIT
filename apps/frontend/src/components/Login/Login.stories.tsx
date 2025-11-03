import type { Meta, StoryObj } from '@storybook/react';
import Login from './Login';

const meta: Meta<typeof Login> = {
    title: 'UI/Login',
    component: Login,
    parameters: {
        layout: 'centered'
    }
}

export default meta

type Story = StoryObj<typeof Login> 

export const LoginStory: Story = {
    args:{
    labels: ['Email', 'Password'],
    txtForBtn: 'Login',
    urlAction: `${import.meta.env.BASE_URL}/auth/login`,
    method: 'POST'
    }
}