import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuContent } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenuContent> = {
  title: 'UI/DropdownMenuContent',
  component: DropdownMenuContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuContent>;

export const Default: Story = {};
