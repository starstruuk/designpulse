import type { Meta, StoryObj } from '@storybook/react';
import { ResizableHandle } from '../components/ui/resizable';

const meta: Meta<typeof ResizableHandle> = {
  title: 'UI/ResizableHandle',
  component: ResizableHandle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ResizableHandle>;

export const Default: Story = {};
