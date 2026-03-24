import type { Meta, StoryObj } from '@storybook/react';
import { SidebarHeader } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarHeader> = {
  title: 'UI/SidebarHeader',
  component: SidebarHeader,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarHeader>;

export const Default: Story = {};
