import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenuTrigger } from '../components/ui/navigation-menu';

const meta: Meta<typeof NavigationMenuTrigger> = {
  title: 'UI/NavigationMenuTrigger',
  component: NavigationMenuTrigger,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavigationMenuTrigger>;

export const Default: Story = {};
