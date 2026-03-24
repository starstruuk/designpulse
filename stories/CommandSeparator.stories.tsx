import type { Meta, StoryObj } from '@storybook/react';
import { CommandSeparator } from '../components/ui/command';

const meta: Meta<typeof CommandSeparator> = {
  title: 'UI/CommandSeparator',
  component: CommandSeparator,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CommandSeparator>;

export const Default: Story = {};
