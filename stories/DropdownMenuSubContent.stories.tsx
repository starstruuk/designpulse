import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuSubContent } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenuSubContent> = {
  title: 'UI/DropdownMenuSubContent',
  component: DropdownMenuSubContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuSubContent>;

export const Default: Story = {};
