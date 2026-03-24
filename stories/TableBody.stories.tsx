import type { Meta, StoryObj } from '@storybook/react';
import { TableBody } from '../components/ui/table';

const meta: Meta<typeof TableBody> = {
  title: 'UI/TableBody',
  component: TableBody,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TableBody>;

export const Default: Story = {};
