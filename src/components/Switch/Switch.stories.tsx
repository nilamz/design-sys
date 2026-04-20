import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Unchecked: Story = {
  args: { checked: false },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};

export const Checked: Story = {
  args: { checked: true },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? true);
    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};

export const WithLabel: Story = {
  args: { checked: false, label: 'Enable notifications' },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};
