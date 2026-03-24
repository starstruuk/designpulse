import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogOverlay } from '../components/ui/alert-dialog';

const meta: Meta<typeof AlertDialogOverlay> = {
  title: 'UI/AlertDialogOverlay',
  component: AlertDialogOverlay,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlertDialogOverlay>;

export const Default: Story = {};
