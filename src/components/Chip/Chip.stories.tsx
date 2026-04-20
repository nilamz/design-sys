import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Active: Story = {
  args: { active: true, children: 'Active' },
};

export const Inactive: Story = {
  args: { active: false, children: 'Inactive' },
};

export const ChipGroup: Story = {
  render: () => {
    const options = ['All', 'Design', 'Engineering', 'Product'];
    const [selected, setSelected] = useState('All');

    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {options.map((option) => (
          <Chip
            key={option}
            active={selected === option}
            onClick={() => setSelected(option)}
          >
            {option}
          </Chip>
        ))}
      </div>
    );
  },
};
