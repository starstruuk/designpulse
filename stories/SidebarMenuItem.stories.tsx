import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenuItem } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarMenuItem> = {
  title: 'UI/SidebarMenuItem',
  component: SidebarMenuItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarMenuItem>;

export const Default: Story = {};
