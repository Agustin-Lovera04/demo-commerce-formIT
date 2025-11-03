import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { fn } from 'storybook/test';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn()
  },
};


export default meta;
type Story = StoryObj<typeof Button>;

export const Success: Story = {
  args: {
    label: 'Success Button',
    variant: 'success',
    onClick() {
      alert('Success action')
    },
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger',
    onClick() {
      alert('Danger action')
    },
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning Button',
    variant: 'warning',
    onClick() {
      alert('Warning action')
    },
  },
};