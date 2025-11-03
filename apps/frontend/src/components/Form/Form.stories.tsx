import type { Meta, StoryObj } from '@storybook/react';
import Form from './Form';

const meta: Meta<typeof Form> = {
  title: 'UI/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Form>;

export const LoginForm: Story = {
  args: {
    labels: ['Email', 'Password'],
    txtForBtn: 'Login',
    urlAction: `${import.meta.env.BASE_URL}/auth/login`,
    method: 'POST'
  },
};

export const RegisterForm: Story = {
  args: {
    labels: ['Email', 'Password', 'Name'],
    txtForBtn: 'Register',
    urlAction: `${import.meta.env.BASE_URL}/auth/register`,
    method: 'POST'
  }
};

export const CreateProductForm: Story = {
  args: {
    labels: ['Title', 'Stock', 'Price'],
    txtForBtn: 'Create',
    urlAction: `${import.meta.env.BASE_URL}/products/createProduct`,
    method: 'POST'
  }
};

export const EditProductForm: Story = {
  args: {
    labels: ['Title', 'Stock', 'Price'],
    txtForBtn: 'Edit',
    urlAction: `${import.meta.env.BASE_URL}/products/editProduct`,
    method: 'POST',
    id: 'Prod1'
  }
};