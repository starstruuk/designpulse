import type { Meta, StoryObj } from '@storybook/react';
import { SidebarInset } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarInset> = {
  title: 'UI/SidebarInset',
  component: SidebarInset,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarInset>;

export const Default: Story = {};
