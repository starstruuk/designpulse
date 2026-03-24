import type { Meta, StoryObj } from '@storybook/react';
import { InputOTPSeparator } from '../components/ui/input-otp';

const meta: Meta<typeof InputOTPSeparator> = {
  title: 'UI/InputOTPSeparator',
  component: InputOTPSeparator,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof InputOTPSeparator>;

export const Default: Story = {};
