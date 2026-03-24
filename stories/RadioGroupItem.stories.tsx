import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroupItem } from '../components/ui/radio-group';

const meta: Meta<typeof RadioGroupItem> = {
  title: 'UI/RadioGroupItem',
  component: RadioGroupItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof RadioGroupItem>;

export const Default: Story = {};
