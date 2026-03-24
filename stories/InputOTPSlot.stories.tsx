import type { Meta, StoryObj } from '@storybook/react';
import { InputOTPSlot } from '../components/ui/input-otp';

const meta: Meta<typeof InputOTPSlot> = {
  title: 'UI/InputOTPSlot',
  component: InputOTPSlot,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof InputOTPSlot>;

export const Default: Story = {};
