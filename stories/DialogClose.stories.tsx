import type { Meta, StoryObj } from '@storybook/react';
import { DialogClose } from '../components/ui/dialog';

const meta: Meta<typeof DialogClose> = {
  title: 'UI/DialogClose',
  component: DialogClose,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DialogClose>;

export const Default: Story = {};
