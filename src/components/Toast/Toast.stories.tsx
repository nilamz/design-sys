import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';
import { Button } from '../Button/Button';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <div style={{ padding: 32 }}>
        <Button onClick={() => setVisible(true)}>Show Toast</Button>
        <Toast
          message="Action completed successfully"
          visible={visible}
          onDismiss={() => setVisible(false)}
        />
      </div>
    );
  },
};

export const LongDuration: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <div style={{ padding: 32 }}>
        <Button onClick={() => setVisible(true)}>Show Toast (5s)</Button>
        <Toast
          message="This toast stays for 5 seconds"
          visible={visible}
          duration={5000}
          onDismiss={() => setVisible(false)}
        />
      </div>
    );
  },
};
