import type { Meta, StoryObj } from '@storybook/react';
import { ChartLegend } from '../components/ui/chart';

const meta: Meta<typeof ChartLegend> = {
  title: 'UI/ChartLegend',
  component: ChartLegend,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ChartLegend>;

export const Default: Story = {};
