import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenu, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuItem, NavigationMenuLabel, NavigationMenuSeparator } from '../components/ui/navigation-menu';

const meta: Meta<typeof NavigationMenu> = {
  title: 'UI/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  render: () => (
  <NavigationMenu>
    {/* compose NavigationMenuTrigger, NavigationMenuContent, NavigationMenuItem, NavigationMenuLabel, NavigationMenuSeparator here */}
  </NavigationMenu>
  ),
};
