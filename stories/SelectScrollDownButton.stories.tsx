import type { Meta, StoryObj } from '@storybook/react';
import { SelectScrollDownButton } from '../components/ui/select';

const meta: Meta<typeof SelectScrollDownButton> = {
  title: 'UI/SelectScrollDownButton',
  component: SelectScrollDownButton,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SelectScrollDownButton>;

export const Default: Story = {};
