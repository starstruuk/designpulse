import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardHeader, HoverCardTitle, HoverCardDescription } from '../components/ui/hover-card';

const meta: Meta<typeof HoverCard> = {
  title: 'UI/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
  <HoverCard>
    {/* compose HoverCardTrigger, HoverCardContent, HoverCardHeader, HoverCardTitle, HoverCardDescription here */}
  </HoverCard>
  ),
};
