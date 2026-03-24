import type { Meta, StoryObj } from '@storybook/react';
import { CardDescription } from '../components/ui/card';

const meta: Meta<typeof CardDescription> = {
  title: 'UI/CardDescription',
  component: CardDescription,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CardDescription>;

export const Default: Story = {};
