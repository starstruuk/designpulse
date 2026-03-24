import type { Meta, StoryObj } from '@storybook/react';
import { CommandDialog } from '../components/ui/command';

const meta: Meta<typeof CommandDialog> = {
  title: 'UI/CommandDialog',
  component: CommandDialog,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CommandDialog>;

export const Default: Story = {};
