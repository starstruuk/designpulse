import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../components/ui/select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
  <Select>
    {/* compose SelectTrigger, SelectContent, SelectItem, SelectValue here */}
  </Select>
  ),
};
