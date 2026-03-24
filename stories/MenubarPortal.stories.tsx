import type { Meta, StoryObj } from '@storybook/react';
import { MenubarPortal } from '../components/ui/menubar';

const meta: Meta<typeof MenubarPortal> = {
  title: 'UI/MenubarPortal',
  component: MenubarPortal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarPortal>;

export const Default: Story = {};
