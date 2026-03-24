import type { Meta, StoryObj } from '@storybook/react';
import { TableHead } from '../components/ui/table';

const meta: Meta<typeof TableHead> = {
  title: 'UI/TableHead',
  component: TableHead,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TableHead>;

export const Default: Story = {};
