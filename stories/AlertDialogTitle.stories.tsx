import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogTitle } from '../components/ui/alert-dialog';

const meta: Meta<typeof AlertDialogTitle> = {
  title: 'UI/AlertDialogTitle',
  component: AlertDialogTitle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlertDialogTitle>;

export const Default: Story = {};
