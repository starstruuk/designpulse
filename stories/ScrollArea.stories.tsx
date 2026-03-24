import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from '../components/ui/scroll-area';

const meta: Meta<typeof ScrollArea> = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
  <ScrollArea>
    {/* compose ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb here */}
  </ScrollArea>
  ),
};
