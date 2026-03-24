import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '../components/ui/alert-dialog';

const meta: Meta<typeof AlertDialog> = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  render: () => (
  <AlertDialog>
    {/* compose AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel here */}
  </AlertDialog>
  ),
};
