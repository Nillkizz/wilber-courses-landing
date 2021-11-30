const isDev = true;

const distFolder = "dist",
  srcFolder = "src";

const path = {
  build: {
    html: `${distFolder}/`,
    css: `${distFolder}/css/`,
    js: `${distFolder}/js/`,
    assets: `${distFolder}/assets/`,
  },
  src: {
    pug: [
      `${srcFolder}/**/*.pug`,
      `!${srcFolder}/parts/**/*.pug`,
      `!${srcFolder}/**/_*.pug`,
    ],
    sass: `${srcFolder}/sass/main.sass`,
    js: `${srcFolder}/js/main.js`,
    assets: `${srcFolder}/assets/**/*`,
  },
  watch: {
    pug: `${srcFolder}/**/*.pug`,
    styles: `${srcFolder}/sass/**/*.{scss,sass, css}`,
    js: `${srcFolder}/js/**/*.js`,
    assets: `${srcFolder}/assets/**/*`,
  },
  clear: `./${distFolder}/`,
  srcFolder: `./${srcFolder}/`,
  distFolder: `./${distFolder}/`,
};

const configs = {
  global: {
    isDev: isDev,
    isProd: !isDev,
  },
  postcss: {
    plugins(...names) {
      return names.map((name) => require(name));
    },
  },
};

exports.path = path;
exports.configs = configs;
