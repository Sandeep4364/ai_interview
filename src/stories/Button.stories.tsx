import type { Meta, StoryObj } from '@storybook/react';
import { Play } from 'lucide-react';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'submit';
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ variant, children, isLoading, disabled, onClick }: ButtonProps) => {
  const baseClasses = 'inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium';
  const variantClasses = {
    primary: 'btn-primary text-white bg-indigo-600 hover:bg-indigo-700',
    secondary: 'btn-secondary text-gray-700 bg-gray-100 hover:bg-gray-200',
    danger: 'btn-danger text-white bg-red-600 hover:bg-red-700',
    submit: 'btn-submit text-white bg-indigo-600 hover:bg-indigo-700',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${isLoading ? 'btn-loading' : ''}`}
    >
      {children}
    </button>
  );
};

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'submit'],
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Play className="h-5 w-5 mr-2" />
        Start Practice
      </>
    ),
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Cancel',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
};

export const Loading: Story = {
  args: {
    variant: 'submit',
    children: 'Submitting...',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
};