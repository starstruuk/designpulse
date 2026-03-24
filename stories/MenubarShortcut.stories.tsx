import type { Meta, StoryObj } from '@storybook/react';
import { MenubarShortcut } from '../components/ui/menubar';

const meta: Meta<typeof MenubarShortcut> = {
  title: 'UI/MenubarShortcut',
  component: MenubarShortcut,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarShortcut>;

export const Default: Story = {};
