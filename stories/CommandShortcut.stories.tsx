import type { Meta, StoryObj } from '@storybook/react';
import { CommandShortcut } from '../components/ui/command';

const meta: Meta<typeof CommandShortcut> = {
  title: 'UI/CommandShortcut',
  component: CommandShortcut,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CommandShortcut>;

export const Default: Story = {};
