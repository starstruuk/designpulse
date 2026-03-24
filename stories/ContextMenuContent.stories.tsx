import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuContent } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenuContent> = {
  title: 'UI/ContextMenuContent',
  component: ContextMenuContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenuContent>;

export const Default: Story = {};
