import type { Meta, StoryObj } from '@storybook/react';
import { DialogPortal } from '../components/ui/dialog';

const meta: Meta<typeof DialogPortal> = {
  title: 'UI/DialogPortal',
  component: DialogPortal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DialogPortal>;

export const Default: Story = {};
