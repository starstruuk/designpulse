import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuCheckboxItem } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenuCheckboxItem> = {
  title: 'UI/DropdownMenuCheckboxItem',
  component: DropdownMenuCheckboxItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuCheckboxItem>;

export const Default: Story = {};
