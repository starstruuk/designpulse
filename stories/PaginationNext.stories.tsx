import type { Meta, StoryObj } from '@storybook/react';
import { PaginationNext } from '../components/ui/pagination';

const meta: Meta<typeof PaginationNext> = {
  title: 'UI/PaginationNext',
  component: PaginationNext,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PaginationNext>;

export const Default: Story = {};
