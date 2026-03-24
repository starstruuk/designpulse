import type { Meta, StoryObj } from '@storybook/react';
import { MenubarSub } from '../components/ui/menubar';

const meta: Meta<typeof MenubarSub> = {
  title: 'UI/MenubarSub',
  component: MenubarSub,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarSub>;

export const Default: Story = {};
