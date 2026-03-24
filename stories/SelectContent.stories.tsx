import type { Meta, StoryObj } from '@storybook/react';
import { SelectContent } from '../components/ui/select';

const meta: Meta<typeof SelectContent> = {
  title: 'UI/SelectContent',
  component: SelectContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SelectContent>;

export const Default: Story = {};
