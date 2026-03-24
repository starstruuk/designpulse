import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogPortal } from '../components/ui/alert-dialog';

const meta: Meta<typeof AlertDialogPortal> = {
  title: 'UI/AlertDialogPortal',
  component: AlertDialogPortal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlertDialogPortal>;

export const Default: Story = {};
