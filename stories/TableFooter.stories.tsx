import type { Meta, StoryObj } from '@storybook/react';
import { TableFooter } from '../components/ui/table';

const meta: Meta<typeof TableFooter> = {
  title: 'UI/TableFooter',
  component: TableFooter,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TableFooter>;

export const Default: Story = {};
