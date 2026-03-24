import type { Meta, StoryObj } from '@storybook/react';
import { DialogTrigger } from '../components/ui/dialog';

const meta: Meta<typeof DialogTrigger> = {
  title: 'UI/DialogTrigger',
  component: DialogTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DialogTrigger>;

export const Default: Story = {};
