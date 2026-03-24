import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenuItem } from '../components/ui/navigation-menu';

const meta: Meta<typeof NavigationMenuItem> = {
  title: 'UI/NavigationMenuItem',
  component: NavigationMenuItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavigationMenuItem>;

export const Default: Story = {};
