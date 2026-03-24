import type { Meta, StoryObj } from '@storybook/react';
import { TableRow } from '../components/ui/table';

const meta: Meta<typeof TableRow> = {
  title: 'UI/TableRow',
  component: TableRow,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TableRow>;

export const Default: Story = {};
