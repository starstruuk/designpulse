import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenuLink } from '../components/ui/navigation-menu';

const meta: Meta<typeof NavigationMenuLink> = {
  title: 'UI/NavigationMenuLink',
  component: NavigationMenuLink,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavigationMenuLink>;

export const Default: Story = {};
