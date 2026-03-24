import type { Meta, StoryObj } from '@storybook/react';
import { SelectLabel } from '../components/ui/select';

const meta: Meta<typeof SelectLabel> = {
  title: 'UI/SelectLabel',
  component: SelectLabel,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SelectLabel>;

export const Default: Story = {};
