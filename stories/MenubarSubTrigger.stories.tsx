import type { Meta, StoryObj } from '@storybook/react';
import { MenubarSubTrigger } from '../components/ui/menubar';

const meta: Meta<typeof MenubarSubTrigger> = {
  title: 'UI/MenubarSubTrigger',
  component: MenubarSubTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarSubTrigger>;

export const Default: Story = {};
