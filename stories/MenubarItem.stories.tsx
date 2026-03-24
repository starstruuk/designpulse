import type { Meta, StoryObj } from '@storybook/react';
import { MenubarItem } from '../components/ui/menubar';

const meta: Meta<typeof MenubarItem> = {
  title: 'UI/MenubarItem',
  component: MenubarItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarItem>;

export const Default: Story = {};
