import type { Meta, StoryObj } from '@storybook/react';
import { ChartStyle } from '../components/ui/chart';

const meta: Meta<typeof ChartStyle> = {
  title: 'UI/ChartStyle',
  component: ChartStyle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ChartStyle>;

export const Default: Story = {};
