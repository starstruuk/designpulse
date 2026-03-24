import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonItem } from '../components/ui/skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => (
  <Skeleton>
    {/* compose SkeletonItem here */}
  </Skeleton>
  ),
};
