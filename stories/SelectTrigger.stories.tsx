import type { Meta, StoryObj } from '@storybook/react';
import { SelectTrigger } from '../components/ui/select';

const meta: Meta<typeof SelectTrigger> = {
  title: 'UI/SelectTrigger',
  component: SelectTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SelectTrigger>;

export const Default: Story = {};
