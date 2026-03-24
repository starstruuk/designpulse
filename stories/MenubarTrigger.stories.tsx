import type { Meta, StoryObj } from '@storybook/react';
import { MenubarTrigger } from '../components/ui/menubar';

const meta: Meta<typeof MenubarTrigger> = {
  title: 'UI/MenubarTrigger',
  component: MenubarTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarTrigger>;

export const Default: Story = {};
