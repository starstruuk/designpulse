import type { Meta, StoryObj } from '@storybook/react';
import { FormLabel } from '../components/ui/form';

const meta: Meta<typeof FormLabel> = {
  title: 'UI/FormLabel',
  component: FormLabel,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FormLabel>;

export const Default: Story = {};
