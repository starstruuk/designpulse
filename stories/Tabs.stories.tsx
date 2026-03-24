import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
  <Tabs>
    {/* compose TabsList, TabsTrigger, TabsContent here */}
  </Tabs>
  ),
};
