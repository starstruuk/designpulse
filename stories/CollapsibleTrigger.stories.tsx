import type { Meta, StoryObj } from '@storybook/react';
import { CollapsibleTrigger } from '../components/ui/collapsible';

const meta: Meta<typeof CollapsibleTrigger> = {
  title: 'UI/CollapsibleTrigger',
  component: CollapsibleTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CollapsibleTrigger>;

export const Default: Story = {};
