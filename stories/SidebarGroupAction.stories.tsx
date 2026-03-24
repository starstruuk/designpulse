import type { Meta, StoryObj } from '@storybook/react';
import { SidebarGroupAction } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarGroupAction> = {
  title: 'UI/SidebarGroupAction',
  component: SidebarGroupAction,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarGroupAction>;

export const Default: Story = {};
