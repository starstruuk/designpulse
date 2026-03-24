import type { Meta, StoryObj } from '@storybook/react';
import { Form, FormField, FormLabel, FormControl, FormErrorMessage } from '../components/ui/form';

const meta: Meta<typeof Form> = {
  title: 'UI/Form',
  component: Form,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => (
  <Form>
    {/* compose FormField, FormLabel, FormControl, FormErrorMessage here */}
  </Form>
  ),
};
