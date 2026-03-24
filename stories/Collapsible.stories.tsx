import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../components/ui/collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'UI/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
  <Collapsible>
    {/* compose CollapsibleTrigger, CollapsibleContent here */}
  </Collapsible>
  ),
};
