import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenu } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarMenu> = {
  title: 'UI/SidebarMenu',
  component: SidebarMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarMenu>;

export const Default: Story = {};
