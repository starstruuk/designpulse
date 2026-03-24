import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuSubContent } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenuSubContent> = {
  title: 'UI/ContextMenuSubContent',
  component: ContextMenuSubContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenuSubContent>;

export const Default: Story = {};
