import type { Meta, StoryObj } from '@storybook/react';
import { PaginationItem } from '../components/ui/pagination';

const meta: Meta<typeof PaginationItem> = {
  title: 'UI/PaginationItem',
  component: PaginationItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PaginationItem>;

export const Default: Story = {};
