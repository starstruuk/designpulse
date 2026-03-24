import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuRadioItem } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenuRadioItem> = {
  title: 'UI/DropdownMenuRadioItem',
  component: DropdownMenuRadioItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuRadioItem>;

export const Default: Story = {};
