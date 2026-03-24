import type { Meta, StoryObj } from '@storybook/react';
import { Menubar, MenubarTrigger, MenubarContent, MenubarItem, MenubarLabel, MenubarSeparator } from '../components/ui/menubar';

const meta: Meta<typeof Menubar> = {
  title: 'UI/Menubar',
  component: Menubar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  render: () => (
  <Menubar>
    {/* compose MenubarTrigger, MenubarContent, MenubarItem, MenubarLabel, MenubarSeparator here */}
  </Menubar>
  ),
};
