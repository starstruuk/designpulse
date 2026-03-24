import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarTitle, SidebarDescription, SidebarClose } from '../components/ui/sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
  <Sidebar>
    {/* compose SidebarTrigger, SidebarContent, SidebarHeader, SidebarTitle, SidebarDescription, SidebarClose here */}
  </Sidebar>
  ),
};
