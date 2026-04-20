import type { Meta, StoryObj } from '@storybook/react-vite';
import { PriceAlertCard } from './PriceAlertCard';

const meta: Meta<typeof PriceAlertCard> = {
  title: 'Components/PriceAlertCard',
  component: PriceAlertCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: '360px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof PriceAlertCard>;

export const Default: Story = {
  args: {
    amount: 24.50,
    breakdown: {
      baseFare: 5.00,
      distance: 12.50,
      time: 7.00,
      surge: 0,
      total: 24.50,
    },
  },
};

export const WithSurge: Story = {
  args: {
    amount: 36.75,
    surgeMultiplier: 1.5,
    breakdown: {
      baseFare: 5.00,
      distance: 12.50,
      time: 7.00,
      surge: 12.25,
      total: 36.75,
    },
  },
};

export const HighSurge: Story = {
  args: {
    amount: 49.00,
    surgeMultiplier: 2.0,
    breakdown: {
      baseFare: 5.00,
      distance: 12.50,
      time: 7.00,
      surge: 24.50,
      total: 49.00,
    },
  },
};
