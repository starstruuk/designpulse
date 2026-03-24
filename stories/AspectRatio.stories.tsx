import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio, AspectRatioContent } from '../components/ui/aspect-ratio';

const meta: Meta<typeof AspectRatio> = {
  title: 'UI/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  render: () => (
  <AspectRatio>
    {/* compose AspectRatioContent here */}
  </AspectRatio>
  ),
};
