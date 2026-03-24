import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuGroup } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenuGroup> = {
  title: 'UI/DropdownMenuGroup',
  component: DropdownMenuGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuGroup>;

export const Default: Story = {};
