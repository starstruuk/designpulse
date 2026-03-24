import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogTrigger } from '../components/ui/alert-dialog';

const meta: Meta<typeof AlertDialogTrigger> = {
  title: 'UI/AlertDialogTrigger',
  component: AlertDialogTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlertDialogTrigger>;

export const Default: Story = {};
