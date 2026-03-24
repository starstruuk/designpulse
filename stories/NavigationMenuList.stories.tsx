import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenuList } from '../components/ui/navigation-menu';

const meta: Meta<typeof NavigationMenuList> = {
  title: 'UI/NavigationMenuList',
  component: NavigationMenuList,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavigationMenuList>;

export const Default: Story = {};
