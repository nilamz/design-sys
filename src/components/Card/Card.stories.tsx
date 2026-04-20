import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: '320px' }}>
      <h3
        className="font-display text-xl font-semibold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        Truf Card
      </h3>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Hover over this card to see the lime border accent and elevation effect.
      </p>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card style={{ width: '320px' }}>
      <h3
        className="font-display text-xl font-semibold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        Card with Action
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
        This card includes an action button to demonstrate composition.
      </p>
      <Button variant="contained" size="sm">
        Get Started
      </Button>
    </Card>
  ),
};
