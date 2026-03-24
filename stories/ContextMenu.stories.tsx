import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenu> = {
  title: 'UI/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
  <ContextMenu>
    {/* compose ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator here */}
  </ContextMenu>
  ),
};
