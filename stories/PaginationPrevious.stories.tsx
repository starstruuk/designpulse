import type { Meta, StoryObj } from '@storybook/react';
import { PaginationPrevious } from '../components/ui/pagination';

const meta: Meta<typeof PaginationPrevious> = {
  title: 'UI/PaginationPrevious',
  component: PaginationPrevious,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PaginationPrevious>;

export const Default: Story = {};
