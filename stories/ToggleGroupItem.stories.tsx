import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroupItem } from '../components/ui/toggle-group';

const meta: Meta<typeof ToggleGroupItem> = {
  title: 'UI/ToggleGroupItem',
  component: ToggleGroupItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ToggleGroupItem>;

export const Default: Story = {};
