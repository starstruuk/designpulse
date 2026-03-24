import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogAction } from '../components/ui/alert-dialog';

const meta: Meta<typeof AlertDialogAction> = {
  title: 'UI/AlertDialogAction',
  component: AlertDialogAction,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlertDialogAction>;

export const Default: Story = {};
