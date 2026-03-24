import type { Meta, StoryObj } from '@storybook/react';
import { CardFooter } from '../components/ui/card';

const meta: Meta<typeof CardFooter> = {
  title: 'UI/CardFooter',
  component: CardFooter,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CardFooter>;

export const Default: Story = {};
