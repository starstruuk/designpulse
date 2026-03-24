import type { Meta, StoryObj } from '@storybook/react';
import { CardTitle } from '../components/ui/card';

const meta: Meta<typeof CardTitle> = {
  title: 'UI/CardTitle',
  component: CardTitle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CardTitle>;

export const Default: Story = {};
