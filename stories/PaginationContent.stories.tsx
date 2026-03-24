import type { Meta, StoryObj } from '@storybook/react';
import { PaginationContent } from '../components/ui/pagination';

const meta: Meta<typeof PaginationContent> = {
  title: 'UI/PaginationContent',
  component: PaginationContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PaginationContent>;

export const Default: Story = {};
