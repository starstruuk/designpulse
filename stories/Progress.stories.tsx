import type { Meta, StoryObj } from '@storybook/react';
import { Progress, ProgressBar } from '../components/ui/progress';

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: () => (
  <Progress>
    {/* compose ProgressBar here */}
  </Progress>
  ),
};
