import type { Meta, StoryObj } from '@storybook/react';
import { CarouselPrevious } from '../components/ui/carousel';

const meta: Meta<typeof CarouselPrevious> = {
  title: 'UI/CarouselPrevious',
  component: CarouselPrevious,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CarouselPrevious>;

export const Default: Story = {};
