import type { Meta, StoryObj } from '@storybook/react';
import { BreadcrumbPage } from '../components/ui/breadcrumb';

const meta: Meta<typeof BreadcrumbPage> = {
  title: 'UI/BreadcrumbPage',
  component: BreadcrumbPage,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof BreadcrumbPage>;

export const Default: Story = {};
