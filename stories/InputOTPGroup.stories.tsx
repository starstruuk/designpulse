import type { Meta, StoryObj } from '@storybook/react';
import { InputOTPGroup } from '../components/ui/input-otp';

const meta: Meta<typeof InputOTPGroup> = {
  title: 'UI/InputOTPGroup',
  component: InputOTPGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof InputOTPGroup>;

export const Default: Story = {};
