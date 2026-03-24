import type { Meta, StoryObj } from '@storybook/react';
import { CommandInput } from '../components/ui/command';

const meta: Meta<typeof CommandInput> = {
  title: 'UI/CommandInput',
  component: CommandInput,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CommandInput>;

export const Default: Story = {};
