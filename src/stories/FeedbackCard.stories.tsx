import type { Meta, StoryObj } from '@storybook/react';
import { FeedbackCard } from '../components/FeedbackCard';

const meta = {
  title: 'Components/FeedbackCard',
  component: FeedbackCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    score: { control: { type: 'range', min: 0, max: 100 } },
    feedback: { control: 'text' },
    icon: {
      control: 'select',
      options: ['positive', 'neutral', 'negative'],
    },
  },
} satisfies Meta<typeof FeedbackCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {
  args: {
    title: 'Response Quality',
    score: 95,
    feedback: 'Excellent answer with comprehensive coverage of key points',
    icon: 'positive',
  },
};

export const Neutral: Story = {
  args: {
    title: 'Communication Skills',
    score: 75,
    feedback: 'Good clarity and flow, consider improving pace',
    icon: 'neutral',
  },
};

export const Negative: Story = {
  args: {
    title: 'Body Language',
    score: 45,
    feedback: 'Need improvement in maintaining eye contact and posture',
    icon: 'negative',
  },
};