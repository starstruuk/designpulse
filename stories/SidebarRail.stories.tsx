import type { Meta, StoryObj } from '@storybook/react';
import { SidebarRail } from '../components/ui/sidebar';

const meta: Meta<typeof SidebarRail> = {
  title: 'UI/SidebarRail',
  component: SidebarRail,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SidebarRail>;

export const Default: Story = {};
