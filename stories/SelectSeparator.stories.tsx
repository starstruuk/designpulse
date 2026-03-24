import type { Meta, StoryObj } from '@storybook/react';
import { SelectSeparator } from '../components/ui/select';

const meta: Meta<typeof SelectSeparator> = {
  title: 'UI/SelectSeparator',
  component: SelectSeparator,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SelectSeparator>;

export const Default: Story = {};
