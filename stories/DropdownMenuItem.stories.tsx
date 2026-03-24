import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuItem } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenuItem> = {
  title: 'UI/DropdownMenuItem',
  component: DropdownMenuItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuItem>;

export const Default: Story = {};
