import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuGroup } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenuGroup> = {
  title: 'UI/ContextMenuGroup',
  component: ContextMenuGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenuGroup>;

export const Default: Story = {};
