import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuSubTrigger } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenuSubTrigger> = {
  title: 'UI/ContextMenuSubTrigger',
  component: ContextMenuSubTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenuSubTrigger>;

export const Default: Story = {};
