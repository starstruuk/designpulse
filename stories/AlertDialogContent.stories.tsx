import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogContent } from '../components/ui/alert-dialog';

const meta: Meta<typeof AlertDialogContent> = {
  title: 'UI/AlertDialogContent',
  component: AlertDialogContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlertDialogContent>;

export const Default: Story = {};
