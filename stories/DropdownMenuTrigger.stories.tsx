import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuTrigger } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenuTrigger> = {
  title: 'UI/DropdownMenuTrigger',
  component: DropdownMenuTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuTrigger>;

export const Default: Story = {};
