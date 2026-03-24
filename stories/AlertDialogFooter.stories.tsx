import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogFooter } from '../components/ui/alert-dialog';

const meta: Meta<typeof AlertDialogFooter> = {
  title: 'UI/AlertDialogFooter',
  component: AlertDialogFooter,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlertDialogFooter>;

export const Default: Story = {};
