import type { Meta, StoryObj } from '@storybook/react';
import { SidebarContent } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarContent> = {
  title: 'UI/SidebarContent',
  component: SidebarContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarContent>;

export const Default: Story = {};
