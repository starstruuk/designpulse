import type { Meta, StoryObj } from '@storybook/react';
import { SelectGroup } from '../components/ui/select';

const meta: Meta<typeof SelectGroup> = {
  title: 'UI/SelectGroup',
  component: SelectGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SelectGroup>;

export const Default: Story = {};
