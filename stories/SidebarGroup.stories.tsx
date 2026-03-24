import type { Meta, StoryObj } from '@storybook/react';
import { SidebarGroup } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarGroup> = {
  title: 'UI/SidebarGroup',
  component: SidebarGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarGroup>;

export const Default: Story = {};
