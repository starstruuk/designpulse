import type { Meta, StoryObj } from '@storybook/react';
import { FormControl } from '../components/ui/form';

const meta: Meta<typeof FormControl> = {
  title: 'UI/FormControl',
  component: FormControl,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FormControl>;

export const Default: Story = {};
