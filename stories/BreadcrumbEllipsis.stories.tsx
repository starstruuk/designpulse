import type { Meta, StoryObj } from '@storybook/react';
import { BreadcrumbEllipsis } from '../components/ui/breadcrumb';

const meta: Meta<typeof BreadcrumbEllipsis> = {
  title: 'UI/BreadcrumbEllipsis',
  component: BreadcrumbEllipsis,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof BreadcrumbEllipsis>;

export const Default: Story = {};
