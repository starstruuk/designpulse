import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogCancel } from '../components/ui/alert-dialog';

const meta: Meta<typeof AlertDialogCancel> = {
  title: 'UI/AlertDialogCancel',
  component: AlertDialogCancel,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlertDialogCancel>;

export const Default: Story = {};
