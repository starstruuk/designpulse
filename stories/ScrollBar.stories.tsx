import type { Meta, StoryObj } from '@storybook/react';
import { ScrollBar } from '../components/ui/scroll-area';

const meta: Meta<typeof ScrollBar> = {
  title: 'UI/ScrollBar',
  component: ScrollBar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ScrollBar>;

export const Default: Story = {};
