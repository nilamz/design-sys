import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['contained', 'outlined', 'text'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Contained: Story = {
  args: { variant: 'contained', children: 'Button' },
};

export const Outlined: Story = {
  args: { variant: 'outlined', children: 'Button' },
};

export const TextVariant: Story = {
  args: { variant: 'text', children: 'Button' },
};

export const Small: Story = {
  args: { variant: 'contained', size: 'sm', children: 'Small' },
};

export const Large: Story = {
  args: { variant: 'contained', size: 'lg', children: 'Large' },
};

export const Disabled: Story = {
  args: { variant: 'contained', disabled: true, children: 'Disabled' },
};
