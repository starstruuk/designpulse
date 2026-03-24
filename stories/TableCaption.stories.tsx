import type { Meta, StoryObj } from '@storybook/react';
import { TableCaption } from '../components/ui/table';

const meta: Meta<typeof TableCaption> = {
  title: 'UI/TableCaption',
  component: TableCaption,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TableCaption>;

export const Default: Story = {};
