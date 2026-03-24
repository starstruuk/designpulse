import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuTrigger } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenuTrigger> = {
  title: 'UI/ContextMenuTrigger',
  component: ContextMenuTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenuTrigger>;

export const Default: Story = {};
