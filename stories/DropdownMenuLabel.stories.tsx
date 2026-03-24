import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuLabel } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenuLabel> = {
  title: 'UI/DropdownMenuLabel',
  component: DropdownMenuLabel,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuLabel>;

export const Default: Story = {};
