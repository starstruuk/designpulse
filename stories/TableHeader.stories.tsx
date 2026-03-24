import type { Meta, StoryObj } from '@storybook/react';
import { TableHeader } from '../components/ui/table';

const meta: Meta<typeof TableHeader> = {
  title: 'UI/TableHeader',
  component: TableHeader,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TableHeader>;

export const Default: Story = {};
