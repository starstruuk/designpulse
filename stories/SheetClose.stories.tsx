import type { Meta, StoryObj } from '@storybook/react';
import { SheetClose } from '../components/ui/sheet';

const meta: Meta<typeof SheetClose> = {
  title: 'UI/SheetClose',
  component: SheetClose,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SheetClose>;

export const Default: Story = {};
