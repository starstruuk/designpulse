import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuSub } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenuSub> = {
  title: 'UI/ContextMenuSub',
  component: ContextMenuSub,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenuSub>;

export const Default: Story = {};
