import type { Meta, StoryObj } from '@storybook/react';
import { SidebarGroupContent } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarGroupContent> = {
  title: 'UI/SidebarGroupContent',
  component: SidebarGroupContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarGroupContent>;

export const Default: Story = {};
