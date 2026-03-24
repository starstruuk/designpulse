import type { Meta, StoryObj } from '@storybook/react';
import { DialogContent } from '../components/ui/dialog';

const meta: Meta<typeof DialogContent> = {
  title: 'UI/DialogContent',
  component: DialogContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DialogContent>;

export const Default: Story = {};
