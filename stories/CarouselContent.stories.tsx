import type { Meta, StoryObj } from '@storybook/react';
import { CarouselContent } from '../components/ui/carousel';

const meta: Meta<typeof CarouselContent> = {
  title: 'UI/CarouselContent',
  component: CarouselContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CarouselContent>;

export const Default: Story = {};
