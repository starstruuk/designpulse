import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogHeader } from '../components/ui/alert-dialog';

const meta: Meta<typeof AlertDialogHeader> = {
  title: 'UI/AlertDialogHeader',
  component: AlertDialogHeader,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlertDialogHeader>;

export const Default: Story = {};
