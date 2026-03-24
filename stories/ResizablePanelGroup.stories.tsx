import type { Meta, StoryObj } from '@storybook/react';
import { ResizablePanelGroup } from '../components/ui/resizable';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'UI/ResizablePanelGroup',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ResizablePanelGroup>;

export const Default: Story = {};
