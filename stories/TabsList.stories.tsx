import type { Meta, StoryObj } from '@storybook/react';
import { TabsList } from '../components/ui/tabs';

const meta: Meta<typeof TabsList> = {
  title: 'UI/TabsList',
  component: TabsList,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TabsList>;

export const Default: Story = {};
