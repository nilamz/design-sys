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
    }),
  ],
  parameters: {
    backgrounds: { disable: true },
    layout: 'centered',
    options: {
      storySort: {
        order: [
          'Getting Started', ['Overview', 'Installation', 'Usage', 'MCP', 'Example Projects', 'Templates', 'Learn', 'Design Resources', 'FAQs', 'Support'],
          'Foundations', ['Principles', 'Design Tokens', 'Theming System', 'Layout & Grid', 'Design to Code', 'Colors', 'Typography', 'Spacing', 'Border Radius', 'Shadows', 'Iconography'],
          'Components',
          'Behavior',
          'Implementation',
        ],
      },
    },
  },
};

export default preview;
