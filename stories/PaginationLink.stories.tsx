import type { Meta, StoryObj } from '@storybook/react';
import { PaginationLink } from '../components/ui/pagination';

const meta: Meta<typeof PaginationLink> = {
  title: 'UI/PaginationLink',
  component: PaginationLink,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PaginationLink>;

export const Default: Story = {};
