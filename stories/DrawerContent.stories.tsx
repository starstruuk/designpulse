import type { Meta, StoryObj } from '@storybook/react';
import { DrawerContent } from '../components/ui/drawer';

const meta: Meta<typeof DrawerContent> = {
  title: 'UI/DrawerContent',
  component: DrawerContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DrawerContent>;

export const Default: Story = {};
