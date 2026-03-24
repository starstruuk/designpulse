import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuRadioGroup } from '../components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenuRadioGroup> = {
  title: 'UI/DropdownMenuRadioGroup',
  component: DropdownMenuRadioGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenuRadioGroup>;

export const Default: Story = {};
