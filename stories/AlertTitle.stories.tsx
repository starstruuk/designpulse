import type { Meta, StoryObj } from '@storybook/react';
import { AlertTitle } from '../components/ui/alert';

const meta: Meta<typeof AlertTitle> = {
  title: 'UI/AlertTitle',
  component: AlertTitle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlertTitle>;

export const Default: Story = {};
