import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription } from '../components/ui/popover';

const meta: Meta<typeof Popover> = {
  title: 'UI/Popover',
  component: Popover,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
  <Popover>
    {/* compose PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription here */}
  </Popover>
  ),
};
