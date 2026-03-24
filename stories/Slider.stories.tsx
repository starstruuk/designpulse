import type { Meta, StoryObj } from '@storybook/react';
import { Slider, SliderTrack, SliderRange, SliderThumb } from '../components/ui/slider';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => (
  <Slider>
    {/* compose SliderTrack, SliderRange, SliderThumb here */}
  </Slider>
  ),
};
