import type { Meta, StoryObj } from '@storybook/react';
import { DrawerPortal } from '../components/ui/drawer';

const meta: Meta<typeof DrawerPortal> = {
  title: 'UI/DrawerPortal',
  component: DrawerPortal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DrawerPortal>;

export const Default: Story = {};
