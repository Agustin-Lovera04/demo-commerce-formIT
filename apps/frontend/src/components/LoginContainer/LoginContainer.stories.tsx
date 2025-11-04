import type { Meta, StoryObj } from '@storybook/react';
import LoginContainer from './LoginContainer';

const meta: Meta<typeof LoginContainer> = {
  title: 'UI/LoginContainer',
  component: LoginContainer,
  parameters: {
    layout: 'centered',
  },
}

export default meta;
type Story = StoryObj<typeof LoginContainer>;

export const Default: Story = {};