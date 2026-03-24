import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenuSubButton } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarMenuSubButton> = {
  title: 'UI/SidebarMenuSubButton',
  component: SidebarMenuSubButton,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarMenuSubButton>;

export const Default: Story = {};
