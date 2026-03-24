import type { Meta, StoryObj } from '@storybook/react';
import { SheetTrigger } from '../components/ui/sheet';

const meta: Meta<typeof SheetTrigger> = {
  title: 'UI/SheetTrigger',
  component: SheetTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SheetTrigger>;

export const Default: Story = {};
