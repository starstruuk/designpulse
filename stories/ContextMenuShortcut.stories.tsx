import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuShortcut } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenuShortcut> = {
  title: 'UI/ContextMenuShortcut',
  component: ContextMenuShortcut,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenuShortcut>;

export const Default: Story = {};
