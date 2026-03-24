import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableCaption } from '../components/ui/table';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
  <Table>
    {/* compose TableHeader, TableBody, TableRow, TableCell, TableCaption here */}
  </Table>
  ),
};
