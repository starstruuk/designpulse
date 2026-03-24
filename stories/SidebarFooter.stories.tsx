import type { Meta, StoryObj } from '@storybook/react';
import { SidebarFooter } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarFooter> = {
  title: 'UI/SidebarFooter',
  component: SidebarFooter,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarFooter>;

export const Default: Story = {};
