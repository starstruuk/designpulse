import type { Meta, StoryObj } from '@storybook/react';
import { CarouselItem } from '../components/ui/carousel';

const meta: Meta<typeof CarouselItem> = {
  title: 'UI/CarouselItem',
  component: CarouselItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CarouselItem>;

export const Default: Story = {};
