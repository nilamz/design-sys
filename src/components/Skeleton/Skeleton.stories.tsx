import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton style={{ width: 200 }} />,
};

export const TextBlock: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 320 }}>
      <Skeleton style={{ width: '100%' }} />
      <Skeleton style={{ width: '80%' }} />
      <Skeleton style={{ width: '60%' }} />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div
      style={{
        width: 320,
        padding: 16,
        borderRadius: 8,
        border: '1px solid var(--border-subtle)',
        background: 'var(--surface-1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <Skeleton style={{ width: '100%', height: 120, borderRadius: 6 }} />
      <Skeleton style={{ width: '70%' }} />
      <Skeleton style={{ width: '50%' }} />
    </div>
  ),
};
