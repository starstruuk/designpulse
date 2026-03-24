import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuSub } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenuSub> = {
  title: 'UI/DropdownMenuSub',
  component: DropdownMenuSub,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuSub>;

export const Default: Story = {};
