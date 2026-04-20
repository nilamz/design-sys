import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Unchecked: Story = {
  args: { checked: false, name: 'demo', value: 'a' },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <RadioButton {...args} checked={checked} onChange={setChecked} />;
  },
};

export const Checked: Story = {
  args: { checked: true, name: 'demo', value: 'a' },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? true);
    return <RadioButton {...args} checked={checked} onChange={setChecked} />;
  },
};

export const WithLabel: Story = {
  args: { checked: false, name: 'plan', value: 'premium', label: 'Premium plan' },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <RadioButton {...args} checked={checked} onChange={setChecked} />;
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('rides');
    return (
      <div className="flex flex-col" style={{ gap: 10 }}>
        <RadioButton
          name="service"
          value="rides"
          label="Rides"
          checked={selected === 'rides'}
          onChange={() => setSelected('rides')}
        />
        <RadioButton
          name="service"
          value="eats"
          label="Eats"
          checked={selected === 'eats'}
          onChange={() => setSelected('eats')}
        />
        <RadioButton
          name="service"
          value="freight"
          label="Freight"
          checked={selected === 'freight'}
          onChange={() => setSelected('freight')}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { checked: false, name: 'demo', value: 'a', disabled: true, label: 'Unavailable' },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <RadioButton {...args} checked={checked} onChange={setChecked} />;
  },
};
