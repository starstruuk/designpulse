import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogDescription } from '../components/ui/alert-dialog';

const meta: Meta<typeof AlertDialogDescription> = {
  title: 'UI/AlertDialogDescription',
  component: AlertDialogDescription,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlertDialogDescription>;

export const Default: Story = {};
