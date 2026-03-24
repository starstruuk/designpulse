import type { Meta, StoryObj } from '@storybook/react';
import { SelectValue } from '../components/ui/select';

const meta: Meta<typeof SelectValue> = {
  title: 'UI/SelectValue',
  component: SelectValue,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SelectValue>;

export const Default: Story = {};
