import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuSeparator } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenuSeparator> = {
  title: 'UI/DropdownMenuSeparator',
  component: DropdownMenuSeparator,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuSeparator>;

export const Default: Story = {};
