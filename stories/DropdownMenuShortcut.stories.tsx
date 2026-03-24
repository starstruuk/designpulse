import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuShortcut } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenuShortcut> = {
  title: 'UI/DropdownMenuShortcut',
  component: DropdownMenuShortcut,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuShortcut>;

export const Default: Story = {};
