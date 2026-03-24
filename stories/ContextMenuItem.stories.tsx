import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuItem } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenuItem> = {
  title: 'UI/ContextMenuItem',
  component: ContextMenuItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenuItem>;

export const Default: Story = {};
