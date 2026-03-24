import type { Meta, StoryObj } from '@storybook/react';
import { CarouselNext } from '../components/ui/carousel';

const meta: Meta<typeof CarouselNext> = {
  title: 'UI/CarouselNext',
  component: CarouselNext,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CarouselNext>;

export const Default: Story = {};
