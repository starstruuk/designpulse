import type { Meta, StoryObj } from '@storybook/react';
import { DrawerHeader } from '../components/ui/drawer';

const meta: Meta<typeof DrawerHeader> = {
  title: 'UI/DrawerHeader',
  component: DrawerHeader,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DrawerHeader>;

export const Default: Story = {};
