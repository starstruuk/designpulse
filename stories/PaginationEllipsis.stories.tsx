import type { Meta, StoryObj } from '@storybook/react';
import { PaginationEllipsis } from '../components/ui/pagination';

const meta: Meta<typeof PaginationEllipsis> = {
  title: 'UI/PaginationEllipsis',
  component: PaginationEllipsis,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PaginationEllipsis>;

export const Default: Story = {};
