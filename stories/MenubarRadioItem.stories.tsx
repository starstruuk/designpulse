import type { Meta, StoryObj } from '@storybook/react';
import { MenubarRadioItem } from '../components/ui/menubar';

const meta: Meta<typeof MenubarRadioItem> = {
  title: 'UI/MenubarRadioItem',
  component: MenubarRadioItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarRadioItem>;

export const Default: Story = {};
