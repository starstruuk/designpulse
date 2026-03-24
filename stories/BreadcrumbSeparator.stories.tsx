import type { Meta, StoryObj } from '@storybook/react';
import { BreadcrumbSeparator } from '../components/ui/breadcrumb';

const meta: Meta<typeof BreadcrumbSeparator> = {
  title: 'UI/BreadcrumbSeparator',
  component: BreadcrumbSeparator,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof BreadcrumbSeparator>;

export const Default: Story = {};
