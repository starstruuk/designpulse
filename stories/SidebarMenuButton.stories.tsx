import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenuButton } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarMenuButton> = {
  title: 'UI/SidebarMenuButton',
  component: SidebarMenuButton,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarMenuButton>;

export const Default: Story = {};
