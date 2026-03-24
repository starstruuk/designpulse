import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuRadioGroup } from '../components/ui/context-menu';

const meta: Meta<typeof ContextMenuRadioGroup> = {
  title: 'UI/ContextMenuRadioGroup',
  component: ContextMenuRadioGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenuRadioGroup>;

export const Default: Story = {};
