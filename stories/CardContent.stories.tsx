import type { Meta, StoryObj } from '@storybook/react';
import { CardContent } from '../components/ui/card';

const meta: Meta<typeof CardContent> = {
  title: 'UI/CardContent',
  component: CardContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CardContent>;

export const Default: Story = {};
