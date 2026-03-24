import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenuSkeleton } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarMenuSkeleton> = {
  title: 'UI/SidebarMenuSkeleton',
  component: SidebarMenuSkeleton,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarMenuSkeleton>;

export const Default: Story = {};
