import type { Meta, StoryObj } from '@storybook/react';
import { BreadcrumbList } from '../components/ui/breadcrumb';

const meta: Meta<typeof BreadcrumbList> = {
  title: 'UI/BreadcrumbList',
  component: BreadcrumbList,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof BreadcrumbList>;

export const Default: Story = {};
