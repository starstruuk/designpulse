import type { Meta, StoryObj } from '@storybook/react';
import { SheetDescription } from '../components/ui/sheet';

const meta: Meta<typeof SheetDescription> = {
  title: 'UI/SheetDescription',
  component: SheetDescription,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SheetDescription>;

export const Default: Story = {};
