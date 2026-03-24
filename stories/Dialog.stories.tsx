import type { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogAction, DialogCancel } from '../components/ui/dialog';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
  <Dialog>
    {/* compose DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogAction, DialogCancel here */}
  </Dialog>
  ),
};
