import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuPortal } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenuPortal> = {
  title: 'UI/ContextMenuPortal',
  component: ContextMenuPortal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenuPortal>;

export const Default: Story = {};
