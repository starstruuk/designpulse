import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuLabel } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenuLabel> = {
  title: 'UI/ContextMenuLabel',
  component: ContextMenuLabel,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenuLabel>;

export const Default: Story = {};
