import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenuSubItem } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarMenuSubItem> = {
  title: 'UI/SidebarMenuSubItem',
  component: SidebarMenuSubItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarMenuSubItem>;

export const Default: Story = {};
