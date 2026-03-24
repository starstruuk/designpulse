import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, CalendarHeader, CalendarTitle, CalendarNavigation, CalendarGrid, CalendarDay } from '../components/ui/calendar';

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => (
  <Calendar>
    {/* compose CalendarHeader, CalendarTitle, CalendarNavigation, CalendarGrid, CalendarDay here */}
  </Calendar>
  ),
};
