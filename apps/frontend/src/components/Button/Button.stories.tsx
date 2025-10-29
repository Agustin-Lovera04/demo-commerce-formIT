import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters:{
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Success Button',
    variant: 'success',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger',
  },
};
