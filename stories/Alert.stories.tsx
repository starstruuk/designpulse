import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
  <Alert>
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>
  ),
};
