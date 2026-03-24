import type { Meta, StoryObj } from '@storybook/react';
import { Label, LabelIcon } from '../components/ui/label';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => (
  <Label>
    {/* compose LabelIcon here */}
  </Label>
  ),
};
