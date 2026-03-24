import type { Meta, StoryObj } from '@storybook/react';
import { SidebarSeparator } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarSeparator> = {
  title: 'UI/SidebarSeparator',
  component: SidebarSeparator,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarSeparator>;

export const Default: Story = {};
