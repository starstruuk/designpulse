import type { Meta, StoryObj } from '@storybook/react';
import { BreadcrumbItem } from '../components/ui/breadcrumb';

const meta: Meta<typeof BreadcrumbItem> = {
  title: 'UI/BreadcrumbItem',
  component: BreadcrumbItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof BreadcrumbItem>;

export const Default: Story = {};
