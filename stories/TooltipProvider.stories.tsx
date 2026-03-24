import type { Meta, StoryObj } from '@storybook/react';
import { TooltipProvider } from '../components/ui/tooltip';

const meta: Meta<typeof TooltipProvider> = {
  title: 'UI/TooltipProvider',
  component: TooltipProvider,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TooltipProvider>;

export const Default: Story = {};
