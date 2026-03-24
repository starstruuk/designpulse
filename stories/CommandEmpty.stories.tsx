import type { Meta, StoryObj } from '@storybook/react';
import { CommandEmpty } from '../components/ui/command';

const meta: Meta<typeof CommandEmpty> = {
  title: 'UI/CommandEmpty',
  component: CommandEmpty,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CommandEmpty>;

export const Default: Story = {};
