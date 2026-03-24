import type { Meta, StoryObj } from '@storybook/react';
import { PopoverTrigger } from '../components/ui/popover';

const meta: Meta<typeof PopoverTrigger> = {
  title: 'UI/PopoverTrigger',
  component: PopoverTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PopoverTrigger>;

export const Default: Story = {};
