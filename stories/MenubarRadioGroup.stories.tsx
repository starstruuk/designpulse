import type { Meta, StoryObj } from '@storybook/react';
import { MenubarRadioGroup } from '../components/ui/menubar';

const meta: Meta<typeof MenubarRadioGroup> = {
  title: 'UI/MenubarRadioGroup',
  component: MenubarRadioGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenubarRadioGroup>;

export const Default: Story = {};
