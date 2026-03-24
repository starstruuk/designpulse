import type { Meta, StoryObj } from '@storybook/react';
import { DialogFooter } from '../components/ui/dialog';

const meta: Meta<typeof DialogFooter> = {
  title: 'UI/DialogFooter',
  component: DialogFooter,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DialogFooter>;

export const Default: Story = {};
