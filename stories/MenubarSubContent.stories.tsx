import type { Meta, StoryObj } from '@storybook/react';
import { MenubarSubContent } from '../components/ui/menubar';

const meta: Meta<typeof MenubarSubContent> = {
  title: 'UI/MenubarSubContent',
  component: MenubarSubContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarSubContent>;

export const Default: Story = {};
