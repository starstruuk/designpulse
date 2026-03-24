import type { Meta, StoryObj } from '@storybook/react';
import { CommandItem } from '../components/ui/command';

const meta: Meta<typeof CommandItem> = {
  title: 'UI/CommandItem',
  component: CommandItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CommandItem>;

export const Default: Story = {};
