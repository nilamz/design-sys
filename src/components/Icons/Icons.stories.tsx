import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icons } from './Icons';

const meta: Meta<typeof Icons> = {
  title: 'Components/Icons',
  component: Icons,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Icons>;

export const Default: Story = {};
