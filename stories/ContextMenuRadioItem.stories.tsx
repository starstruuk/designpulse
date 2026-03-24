import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuRadioItem } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenuRadioItem> = {
  title: 'UI/ContextMenuRadioItem',
  component: ContextMenuRadioItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenuRadioItem>;

export const Default: Story = {};
