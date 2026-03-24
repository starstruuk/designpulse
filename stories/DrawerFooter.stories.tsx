import type { Meta, StoryObj } from '@storybook/react';
import { DrawerFooter } from '../components/ui/drawer';

const meta: Meta<typeof DrawerFooter> = {
  title: 'UI/DrawerFooter',
  component: DrawerFooter,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DrawerFooter>;

export const Default: Story = {};
