import type { Meta, StoryObj } from '@storybook/react';
import { DialogTitle } from '../components/ui/dialog';

const meta: Meta<typeof DialogTitle> = {
  title: 'UI/DialogTitle',
  component: DialogTitle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DialogTitle>;

export const Default: Story = {};
