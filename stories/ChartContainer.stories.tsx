import type { Meta, StoryObj } from '@storybook/react';
import { ChartContainer } from '../components/ui/chart';

const meta: Meta<typeof ChartContainer> = {
  title: 'UI/ChartContainer',
  component: ChartContainer,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ChartContainer>;

export const Default: Story = {};
