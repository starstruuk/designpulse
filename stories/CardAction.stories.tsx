import type { Meta, StoryObj } from '@storybook/react';
import { CardAction } from '../components/ui/card';

const meta: Meta<typeof CardAction> = {
  title: 'UI/CardAction',
  component: CardAction,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CardAction>;

export const Default: Story = {};
