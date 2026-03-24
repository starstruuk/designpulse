import type { Meta, StoryObj } from '@storybook/react';
import { FormDescription } from '../components/ui/form';

const meta: Meta<typeof FormDescription> = {
  title: 'UI/FormDescription',
  component: FormDescription,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FormDescription>;

export const Default: Story = {};
