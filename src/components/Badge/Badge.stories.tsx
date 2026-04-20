import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['lime', 'forest', 'mint', 'outline'] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Lime: Story = {
  args: { variant: 'lime', children: 'Badge' },
};

export const Forest: Story = {
  args: { variant: 'forest', children: 'Badge' },
};

export const Mint: Story = {
  args: { variant: 'mint', children: 'Badge' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Badge' },
};
