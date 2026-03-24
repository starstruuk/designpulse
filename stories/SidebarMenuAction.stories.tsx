import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenuAction } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarMenuAction> = {
  title: 'UI/SidebarMenuAction',
  component: SidebarMenuAction,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarMenuAction>;

export const Default: Story = {};
