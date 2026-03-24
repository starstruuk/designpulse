import type { Meta, StoryObj } from '@storybook/react';
import { TooltipTrigger } from '../components/ui/tooltip';

const meta: Meta<typeof TooltipTrigger> = {
  title: 'UI/TooltipTrigger',
  component: TooltipTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TooltipTrigger>;

export const Default: Story = {};
