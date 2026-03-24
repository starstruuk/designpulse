import type { Meta, StoryObj } from '@storybook/react';
import { TooltipContent } from '../components/ui/tooltip';

const meta: Meta<typeof TooltipContent> = {
  title: 'UI/TooltipContent',
  component: TooltipContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TooltipContent>;

export const Default: Story = {};
