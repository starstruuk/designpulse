import type { Meta, StoryObj } from '@storybook/react';
import { DialogDescription } from '../components/ui/dialog';

const meta: Meta<typeof DialogDescription> = {
  title: 'UI/DialogDescription',
  component: DialogDescription,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DialogDescription>;

export const Default: Story = {};
