import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenuSub } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarMenuSub> = {
  title: 'UI/SidebarMenuSub',
  component: SidebarMenuSub,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarMenuSub>;

export const Default: Story = {};
