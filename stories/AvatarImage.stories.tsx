import type { Meta, StoryObj } from '@storybook/react';
import { AvatarImage } from '../components/ui/avatar';

const meta: Meta<typeof AvatarImage> = {
  title: 'UI/AvatarImage',
  component: AvatarImage,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AvatarImage>;

export const Default: Story = {};
