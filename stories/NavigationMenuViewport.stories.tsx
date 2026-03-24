import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenuViewport } from '../components/ui/navigation-menu';

const meta: Meta<typeof NavigationMenuViewport> = {
  title: 'UI/NavigationMenuViewport',
  component: NavigationMenuViewport,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavigationMenuViewport>;

export const Default: Story = {};
