import type { Meta, StoryObj } from '@storybook/react';
import { MenubarContent } from '../components/ui/menubar';

const meta: Meta<typeof MenubarContent> = {
  title: 'UI/MenubarContent',
  component: MenubarContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarContent>;

export const Default: Story = {};
