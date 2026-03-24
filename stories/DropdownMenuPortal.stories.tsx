import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuPortal } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenuPortal> = {
  title: 'UI/DropdownMenuPortal',
  component: DropdownMenuPortal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuPortal>;

export const Default: Story = {};
