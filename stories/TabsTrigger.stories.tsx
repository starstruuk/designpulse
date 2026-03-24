import type { Meta, StoryObj } from '@storybook/react';
import { TabsTrigger } from '../components/ui/tabs';

const meta: Meta<typeof TabsTrigger> = {
  title: 'UI/TabsTrigger',
  component: TabsTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TabsTrigger>;

export const Default: Story = {};
