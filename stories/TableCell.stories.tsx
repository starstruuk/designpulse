import type { Meta, StoryObj } from '@storybook/react';
import { TableCell } from '../components/ui/table';

const meta: Meta<typeof TableCell> = {
  title: 'UI/TableCell',
  component: TableCell,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TableCell>;

export const Default: Story = {};
