import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuSubTrigger } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenuSubTrigger> = {
  title: 'UI/DropdownMenuSubTrigger',
  component: DropdownMenuSubTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuSubTrigger>;

export const Default: Story = {};
