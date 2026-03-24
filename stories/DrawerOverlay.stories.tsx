import type { Meta, StoryObj } from '@storybook/react';
import { DrawerOverlay } from '../components/ui/drawer';

const meta: Meta<typeof DrawerOverlay> = {
  title: 'UI/DrawerOverlay',
  component: DrawerOverlay,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DrawerOverlay>;

export const Default: Story = {};
