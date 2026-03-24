import type { Meta, StoryObj } from '@storybook/react';
import { SidebarProvider } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarProvider> = {
  title: 'UI/SidebarProvider',
  component: SidebarProvider,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarProvider>;

export const Default: Story = {};
