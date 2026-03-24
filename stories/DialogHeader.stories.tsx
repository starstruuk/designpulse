import type { Meta, StoryObj } from '@storybook/react';
import { DialogHeader } from '../components/ui/dialog';

const meta: Meta<typeof DialogHeader> = {
  title: 'UI/DialogHeader',
  component: DialogHeader,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DialogHeader>;

export const Default: Story = {};
