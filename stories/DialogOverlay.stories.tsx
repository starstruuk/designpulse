import type { Meta, StoryObj } from '@storybook/react';
import { DialogOverlay } from '../components/ui/dialog';

const meta: Meta<typeof DialogOverlay> = {
  title: 'UI/DialogOverlay',
  component: DialogOverlay,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DialogOverlay>;

export const Default: Story = {};
