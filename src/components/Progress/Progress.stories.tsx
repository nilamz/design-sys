import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Empty: Story = {
  args: { value: 0 },
};

export const Half: Story = {
  args: { value: 50 },
};

export const Full: Story = {
  args: { value: 100 },
};

export const Animated: Story = {
  render: () => {
    const [val, setVal] = useState(0);
    useEffect(() => {
      const timer = setTimeout(() => setVal(75), 400);
      return () => clearTimeout(timer);
    }, []);
    return (
      <div style={{ width: 320 }}>
        <Progress value={val} />
        <p style={{ color: 'var(--text-secondary)', fontSize: 12, marginTop: 8 }}>
          Animates to 75% on mount
        </p>
      </div>
    );
  },
};
