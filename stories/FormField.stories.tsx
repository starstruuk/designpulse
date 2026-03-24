import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../components/ui/form';

const meta: Meta<typeof FormField> = {
  title: 'UI/FormField',
  component: FormField,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {};
