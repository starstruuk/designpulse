import type { Meta, StoryObj } from '@storybook/react';
import { Chart, ChartBar, ChartLine, ChartPie, ChartAxis, ChartGrid, ChartTooltip } from '../components/ui/chart';

const meta: Meta<typeof Chart> = {
  title: 'UI/Chart',
  component: Chart,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Chart>;

export const Default: Story = {
  render: () => (
  <Chart>
    {/* compose ChartBar, ChartLine, ChartPie, ChartAxis, ChartGrid, ChartTooltip here */}
  </Chart>
  ),
};
