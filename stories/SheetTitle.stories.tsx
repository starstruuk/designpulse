import type { Meta, StoryObj } from '@storybook/react';
import { SheetTitle } from '../components/ui/sheet';

const meta: Meta<typeof SheetTitle> = {
  title: 'UI/SheetTitle',
  component: SheetTitle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SheetTitle>;

export const Default: Story = {};
