import type { Meta, StoryObj } from '@storybook/react';
import CartContainer from './CartContainer';

const meta: Meta<typeof CartContainer> = {
  title: 'UI/CartContainer',
  component: CartContainer,
  parameters: {
    layout: 'centered',
  },
}

export default meta;
type Story = StoryObj<typeof CartContainer>;

export const Default: Story = {};