import type { Meta, StoryObj } from '@storybook/react';
import { MenubarLabel } from '../components/ui/menubar';

const meta: Meta<typeof MenubarLabel> = {
  title: 'UI/MenubarLabel',
  component: MenubarLabel,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarLabel>;

export const Default: Story = {};
