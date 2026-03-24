import type { Meta, StoryObj } from '@storybook/react';
import { SelectItem } from '../components/ui/select';

const meta: Meta<typeof SelectItem> = {
  title: 'UI/SelectItem',
  component: SelectItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SelectItem>;

export const Default: Story = {};
