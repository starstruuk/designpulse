import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
  <Avatar>
    {/* compose AvatarImage, AvatarFallback here */}
  </Avatar>
  ),
};
