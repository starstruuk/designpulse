import type { Meta, StoryObj } from '@storybook/react';
import { PopoverContent } from '../components/ui/popover';

const meta: Meta<typeof PopoverContent> = {
  title: 'UI/PopoverContent',
  component: PopoverContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PopoverContent>;

export const Default: Story = {};
