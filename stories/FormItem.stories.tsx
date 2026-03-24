import type { Meta, StoryObj } from '@storybook/react';
import { FormItem } from '../components/ui/form';

const meta: Meta<typeof FormItem> = {
  title: 'UI/FormItem',
  component: FormItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FormItem>;

export const Default: Story = {};
