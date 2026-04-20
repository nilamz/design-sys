import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldGroup } from './FieldGroup';
import { Input } from '../Input/Input';

const meta: Meta<typeof FieldGroup> = {
  title: 'Components/FieldGroup',
  component: FieldGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FieldGroup>;

export const WithLabelAndHelp: Story = {
  render: () => (
    <FieldGroup label="Email" help="We'll never share your email">
      <Input placeholder="Enter your email..." />
    </FieldGroup>
  ),
};

export const LabelOnly: Story = {
  render: () => (
    <FieldGroup label="Email">
      <Input placeholder="Enter your email..." />
    </FieldGroup>
  ),
};
