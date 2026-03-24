import type { Meta, StoryObj } from '@storybook/react';
import { DrawerTitle } from '../components/ui/drawer';

const meta: Meta<typeof DrawerTitle> = {
  title: 'UI/DrawerTitle',
  component: DrawerTitle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DrawerTitle>;

export const Default: Story = {};
