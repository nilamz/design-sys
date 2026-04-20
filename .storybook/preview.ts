import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/styles/globals.css';

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        dark: '',
        light: 'light',
      },
      defaultTheme: 'dark',
      attributeName: 'data-theme',
      parentSelector: 'body',
    }),
  ],
  parameters: {
    backgrounds: { disable: true },
    layout: 'centered',
  },
};

export default preview;
