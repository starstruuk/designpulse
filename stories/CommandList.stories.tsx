import type { Meta, StoryObj } from '@storybook/react';
import { CommandList } from '../components/ui/command';

const meta: Meta<typeof CommandList> = {
  title: 'UI/CommandList',
  component: CommandList,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CommandList>;

export const Default: Story = {};
