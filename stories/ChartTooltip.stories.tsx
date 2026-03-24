import type { Meta, StoryObj } from '@storybook/react';
import { ChartTooltip } from '../components/ui/chart';

const meta: Meta<typeof ChartTooltip> = {
  title: 'UI/ChartTooltip',
  component: ChartTooltip,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ChartTooltip>;

export const Default: Story = {};
