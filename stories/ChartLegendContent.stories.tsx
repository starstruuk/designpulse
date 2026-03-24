import type { Meta, StoryObj } from '@storybook/react';
import { ChartLegendContent } from '../components/ui/chart';

const meta: Meta<typeof ChartLegendContent> = {
  title: 'UI/ChartLegendContent',
  component: ChartLegendContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ChartLegendContent>;

export const Default: Story = {};
