import type { Meta, StoryObj } from '@storybook/react';
import { CommandGroup } from '../components/ui/command';

const meta: Meta<typeof CommandGroup> = {
  title: 'UI/CommandGroup',
  component: CommandGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CommandGroup>;

export const Default: Story = {};
