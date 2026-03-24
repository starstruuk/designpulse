import type { Meta, StoryObj } from '@storybook/react';
import { Toggle, ToggleIcon } from '../components/ui/toggle';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => (
  <Toggle>
    {/* compose ToggleIcon here */}
  </Toggle>
  ),
};
