import type { Meta, StoryObj } from '@storybook/react';
import { DrawerDescription } from '../components/ui/drawer';

const meta: Meta<typeof DrawerDescription> = {
  title: 'UI/DrawerDescription',
  component: DrawerDescription,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DrawerDescription>;

export const Default: Story = {};
