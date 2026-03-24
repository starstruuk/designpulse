import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxInput, CheckboxIndicator } from '../components/ui/checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => (
  <Checkbox>
    {/* compose CheckboxInput, CheckboxIndicator here */}
  </Checkbox>
  ),
};
