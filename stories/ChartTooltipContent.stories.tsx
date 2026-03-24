import type { Meta, StoryObj } from '@storybook/react';
import { ChartTooltipContent } from '../components/ui/chart';

const meta: Meta<typeof ChartTooltipContent> = {
  title: 'UI/ChartTooltipContent',
  component: ChartTooltipContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ChartTooltipContent>;

export const Default: Story = {};
