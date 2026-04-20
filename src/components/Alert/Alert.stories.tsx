import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['success', 'warning', 'error', 'info'] },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Alert Title',
    description: 'Description text here.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Alert Title',
    description: 'Description text here.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Alert Title',
    description: 'Description text here.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Alert Title',
    description: 'Description text here.',
  },
};

export const WithChildren: Story = {
  render: () => (
    <Alert variant="info" title="Custom Content">
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        This alert contains <strong>custom JSX children</strong> instead of a description string.
      </p>
    </Alert>
  ),
};
