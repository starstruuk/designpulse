import type { Meta, StoryObj } from '@storybook/react';
import { FormMessage } from '../components/ui/form';

const meta: Meta<typeof FormMessage> = {
  title: 'UI/FormMessage',
  component: FormMessage,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FormMessage>;

export const Default: Story = {};
