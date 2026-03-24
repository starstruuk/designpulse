import type { Meta, StoryObj } from '@storybook/react';
import { CardHeader } from '../components/ui/card';

const meta: Meta<typeof CardHeader> = {
  title: 'UI/CardHeader',
  component: CardHeader,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CardHeader>;

export const Default: Story = {};
