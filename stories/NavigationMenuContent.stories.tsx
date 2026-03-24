import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenuContent } from '../components/ui/navigation-menu';

const meta: Meta<typeof NavigationMenuContent> = {
  title: 'UI/NavigationMenuContent',
  component: NavigationMenuContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavigationMenuContent>;

export const Default: Story = {};
