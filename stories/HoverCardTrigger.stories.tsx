import type { Meta, StoryObj } from '@storybook/react';
import { HoverCardTrigger } from '../components/ui/hover-card';

const meta: Meta<typeof HoverCardTrigger> = {
  title: 'UI/HoverCardTrigger',
  component: HoverCardTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof HoverCardTrigger>;

export const Default: Story = {};
