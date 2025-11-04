import type { Meta, StoryObj } from '@storybook/react';
import RegisterContainer from './RegisterContainer';

const meta: Meta<typeof RegisterContainer> = {
  title: 'UI/RegisterContainer',
  component: RegisterContainer,
  parameters: {
    layout: 'centered',
  },
} 

export default meta;
type Story = StoryObj<typeof RegisterContainer>;

export const Default: Story = {};