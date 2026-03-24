import type { Meta, StoryObj } from '@storybook/react';
import { Switch, SwitchInput, SwitchThumb } from '../components/ui/switch';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => (
  <Switch>
    {/* compose SwitchInput, SwitchThumb here */}
  </Switch>
  ),
};
