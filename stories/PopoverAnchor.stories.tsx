import type { Meta, StoryObj } from '@storybook/react';
import { PopoverAnchor } from '../components/ui/popover';

const meta: Meta<typeof PopoverAnchor> = {
  title: 'UI/PopoverAnchor',
  component: PopoverAnchor,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PopoverAnchor>;

export const Default: Story = {};
