import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'UI/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
  <DropdownMenu>
    {/* compose DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator here */}
  </DropdownMenu>
  ),
};
