import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuCheckboxItem } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenuCheckboxItem> = {
  title: 'UI/ContextMenuCheckboxItem',
  component: ContextMenuCheckboxItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenuCheckboxItem>;

export const Default: Story = {};
