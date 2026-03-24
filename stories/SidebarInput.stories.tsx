import type { Meta, StoryObj } from '@storybook/react';
import { SidebarInput } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarInput> = {
  title: 'UI/SidebarInput',
  component: SidebarInput,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarInput>;

export const Default: Story = {};
