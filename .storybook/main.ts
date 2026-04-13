import type { StorybookConfig } from '@storybook/vue3-vite';
import svgLoader from 'vite-svg-loader';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const config: StorybookConfig = {
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  stories: [
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    'storybook-addon-mock',
    '@storybook/addon-mdx-gfm',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    config.plugins = config.plugins ?? [];
    config.resolve = config.resolve ?? {};
    config.plugins.push(vue());
    config.plugins.push(AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      dts: './.nuxt/nuxt.d.ts',
    }));
    config.plugins.push(svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
          {
            name: 'removeAttrs',
            params: {
              attrs: ['*:(stroke):((?!^none$).)*', 'path:fill:none'],
            },
          },
        ],
      },
    }));
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '..'),
      '~': path.resolve(__dirname, '..'),
    };
    return {
      ...config,
      define: {
        ...config.define,
        global: 'window',
      },
      css: {
        postcss: null,
        preprocessorOptions: {
          scss: {
            additionalData: `
            @use "~/assets/styles/global.scss" as *;
          `,
          },
        },
      },
    };
  },
};

export default config;
