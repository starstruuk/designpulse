import type { Meta, StoryObj } from '@storybook/react';
import { TabsContent } from '../components/ui/tabs';

const meta: Meta<typeof TabsContent> = {
  title: 'UI/TabsContent',
  component: TabsContent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TabsContent>;

export const Default: Story = {};
