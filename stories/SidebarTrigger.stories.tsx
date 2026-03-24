import type { Meta, StoryObj } from '@storybook/react';
import { SidebarTrigger } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarTrigger> = {
  title: 'UI/SidebarTrigger',
  component: SidebarTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarTrigger>;

export const Default: Story = {};
