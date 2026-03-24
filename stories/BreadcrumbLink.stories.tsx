import type { Meta, StoryObj } from '@storybook/react';
import { BreadcrumbLink } from '../components/ui/breadcrumb';

const meta: Meta<typeof BreadcrumbLink> = {
  title: 'UI/BreadcrumbLink',
  component: BreadcrumbLink,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof BreadcrumbLink>;

export const Default: Story = {};
