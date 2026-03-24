import type { Meta, StoryObj } from '@storybook/react';
import { SheetHeader } from '../components/ui/sheet';

const meta: Meta<typeof SheetHeader> = {
  title: 'UI/SheetHeader',
  component: SheetHeader,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SheetHeader>;

export const Default: Story = {};
