import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuSeparator } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenuSeparator> = {
  title: 'UI/ContextMenuSeparator',
  component: ContextMenuSeparator,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenuSeparator>;

export const Default: Story = {};
