import type { Meta, StoryObj } from '@storybook/react';
import { SelectScrollUpButton } from '../components/ui/select';

const meta: Meta<typeof SelectScrollUpButton> = {
  title: 'UI/SelectScrollUpButton',
  component: SelectScrollUpButton,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SelectScrollUpButton>;

export const Default: Story = {};
