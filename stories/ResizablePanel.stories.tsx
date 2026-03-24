import type { Meta, StoryObj } from '@storybook/react';
import { ResizablePanel } from '../components/ui/resizable';

const meta: Meta<typeof ResizablePanel> = {
  title: 'UI/ResizablePanel',
  component: ResizablePanel,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ResizablePanel>;

export const Default: Story = {};
