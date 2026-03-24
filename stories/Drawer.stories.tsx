import type { Meta, StoryObj } from '@storybook/react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from '../components/ui/drawer';

const meta: Meta<typeof Drawer> = {
  title: 'UI/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
  <Drawer>
    {/* compose DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose here */}
  </Drawer>
  ),
};
