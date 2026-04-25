import type { Meta, StoryObj } from '@storybook/react-vite';
import { RideMap } from './RideMap';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '';

const meta: Meta<typeof RideMap> = {
  title: 'Components/RideMap',
  component: RideMap,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    apiKey: { table: { disable: true } },
  },
  decorators: [(Story) => <div style={{ width: '600px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof RideMap>;

export const Default: Story = {
  args: {
    apiKey,
    pickup: { lat: 37.7749, lng: -122.4194 },
    dropoff: { lat: 37.7849, lng: -122.4094 },
  },
};

export const WithDriver: Story = {
  args: {
    apiKey,
    pickup: { lat: 37.7749, lng: -122.4194 },
    dropoff: { lat: 37.7849, lng: -122.4094 },
    driver: { lat: 37.7799, lng: -122.4144 },
  },
};

export const NoApiKey: Story = {
  args: {
    apiKey: '',
    pickup: { lat: 37.7749, lng: -122.4194 },
    dropoff: { lat: 37.7849, lng: -122.4094 },
  },
};
