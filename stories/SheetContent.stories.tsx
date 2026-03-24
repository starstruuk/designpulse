import type { Meta, StoryObj } from '@storybook/react';
import { SheetContent } from '../components/ui/sheet';

const meta: Meta<typeof SheetContent> = {
  title: 'UI/SheetContent',
  component: SheetContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SheetContent>;

export const Default: Story = {};
