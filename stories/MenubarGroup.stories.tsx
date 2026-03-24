import type { Meta, StoryObj } from '@storybook/react';
import { MenubarGroup } from '../components/ui/menubar';

const meta: Meta<typeof MenubarGroup> = {
  title: 'UI/MenubarGroup',
  component: MenubarGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarGroup>;

export const Default: Story = {};
