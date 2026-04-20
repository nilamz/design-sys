import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
import type { Tab } from './Tabs';

const sampleTabs: Tab[] = [
  { id: 'rides', label: 'Rides' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'history', label: 'History' },
];

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: { tabs: sampleTabs, activeTab: 'rides' },
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.activeTab ?? 'rides');
    return <Tabs {...args} activeTab={activeTab} onTabChange={setActiveTab} />;
  },
};

export const SecondActive: Story = {
  args: { tabs: sampleTabs, activeTab: 'schedule' },
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.activeTab ?? 'schedule');
    return <Tabs {...args} activeTab={activeTab} onTabChange={setActiveTab} />;
  },
};
