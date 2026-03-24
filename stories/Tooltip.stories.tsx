import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipHeader, TooltipTitle, TooltipDescription } from '../components/ui/tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
  <Tooltip>
    {/* compose TooltipTrigger, TooltipContent, TooltipHeader, TooltipTitle, TooltipDescription here */}
  </Tooltip>
  ),
};
