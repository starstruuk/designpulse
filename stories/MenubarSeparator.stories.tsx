import type { Meta, StoryObj } from '@storybook/react';
import { MenubarSeparator } from '../components/ui/menubar';

const meta: Meta<typeof MenubarSeparator> = {
  title: 'UI/MenubarSeparator',
  component: MenubarSeparator,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarSeparator>;

export const Default: Story = {};
