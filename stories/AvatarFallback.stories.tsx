import type { Meta, StoryObj } from '@storybook/react';
import { AvatarFallback } from '../components/ui/avatar';

const meta: Meta<typeof AvatarFallback> = {
  title: 'UI/AvatarFallback',
  component: AvatarFallback,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AvatarFallback>;

export const Default: Story = {};
