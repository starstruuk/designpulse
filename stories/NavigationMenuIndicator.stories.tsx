import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenuIndicator } from '../components/ui/navigation-menu';

const meta: Meta<typeof NavigationMenuIndicator> = {
  title: 'UI/NavigationMenuIndicator',
  component: NavigationMenuIndicator,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavigationMenuIndicator>;

export const Default: Story = {};
