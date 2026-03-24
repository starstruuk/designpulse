import type { Meta, StoryObj } from '@storybook/react';
import { DrawerClose } from '../components/ui/drawer';

const meta: Meta<typeof DrawerClose> = {
  title: 'UI/DrawerClose',
  component: DrawerClose,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DrawerClose>;

export const Default: Story = {};
