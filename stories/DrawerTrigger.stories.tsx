import type { Meta, StoryObj } from '@storybook/react';
import { DrawerTrigger } from '../components/ui/drawer';

const meta: Meta<typeof DrawerTrigger> = {
  title: 'UI/DrawerTrigger',
  component: DrawerTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DrawerTrigger>;

export const Default: Story = {};
