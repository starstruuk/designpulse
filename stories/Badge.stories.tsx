import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeIcon } from '../components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: () => (
  <Badge>
    {/* compose BadgeIcon here */}
  </Badge>
  ),
};
