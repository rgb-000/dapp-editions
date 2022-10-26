module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require("@tailwindcss/typography")
  ],
  daisyui: {
    styled: true,
    // TODO: Theme needs works
    themes: [
      {
        'dark': {                          /* your theme name */
          fontFamily: {
            display: ['Roboto Mono'],
            body: ['Roboto Mono'],
          },
          'primary': '#1f5484',           /* Primary color */
          'primary-focus': '#1f5484',     /* Primary color - focused */
          'primary-content': 'rgb(32, 39, 32)',   /* Foreground content color to use on primary color */

          'secondary': '#fbb954',         /* Secondary color */
          'secondary-focus': '#fbb954',   /* Secondary color - focused */
          'secondary-content': '#fbb954', /* Foreground content color to use on secondary color */

          'accent': '#fbb954',            /* Accent color */
          'accent-focus': '#fbb954',      /* Accent color - focused */
          'accent-content': '#fbb954',    /* Foreground content color to use on accent color */

          'neutral': '#1f5484',           /* Neutral color */
          'neutral-focus': '#1f5484',     /* Neutral color - focused */
          'neutral-content': '#1f5484',   /* Foreground content color to use on neutral color */

          'base-100': '#181818',          /* Base color of page, used for blank backgrounds */
          'base-200': '#35363a',          /* Base color, a little darker */
          'base-300': '#222222',          /* Base color, even more darker */
          'base-content': '#f9fafb',      /* Foreground content color to use on base color */

          'info': '#2094f3',              /* Info */
          'success': '#009485',           /* Success */
          'warning': '#ff9900',           /* Warning */
          'error': '#ff5724',             /* Error */
        },
      },
      // backup themes:
      // 'dark',
      // 'synthwave'
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}