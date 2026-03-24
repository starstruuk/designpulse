import type { Meta, StoryObj } from '@storybook/react';
import { MenubarCheckboxItem } from '../components/ui/menubar';

const meta: Meta<typeof MenubarCheckboxItem> = {
  title: 'UI/MenubarCheckboxItem',
  component: MenubarCheckboxItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarCheckboxItem>;

export const Default: Story = {};
