import type { Meta, StoryObj } from '@storybook/react';
import { HoverCardContent } from '../components/ui/hover-card';

const meta: Meta<typeof HoverCardContent> = {
  title: 'UI/HoverCardContent',
  component: HoverCardContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof HoverCardContent>;

export const Default: Story = {};
