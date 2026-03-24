import type { Meta, StoryObj } from '@storybook/react';
import { SidebarGroupLabel } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarGroupLabel> = {
  title: 'UI/SidebarGroupLabel',
  component: SidebarGroupLabel,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarGroupLabel>;

export const Default: Story = {};
