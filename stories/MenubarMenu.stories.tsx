import type { Meta, StoryObj } from '@storybook/react';
import { MenubarMenu } from '../components/ui/menubar';

const meta: Meta<typeof MenubarMenu> = {
  title: 'UI/MenubarMenu',
  component: MenubarMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarMenu>;

export const Default: Story = {};
