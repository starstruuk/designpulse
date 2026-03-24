import type { Meta, StoryObj } from '@storybook/react';
import { CollapsibleContent } from '../components/ui/collapsible';

const meta: Meta<typeof CollapsibleContent> = {
  title: 'UI/CollapsibleContent',
  component: CollapsibleContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CollapsibleContent>;

export const Default: Story = {};
