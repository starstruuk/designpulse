import type { Meta, StoryObj } from '@storybook/react';
import { SheetFooter } from '../components/ui/sheet';

const meta: Meta<typeof SheetFooter> = {
  title: 'UI/SheetFooter',
  component: SheetFooter,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SheetFooter>;

export const Default: Story = {};
