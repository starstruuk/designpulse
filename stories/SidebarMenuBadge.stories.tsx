import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenuBadge } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarMenuBadge> = {
  title: 'UI/SidebarMenuBadge',
  component: SidebarMenuBadge,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarMenuBadge>;

export const Default: Story = {};
