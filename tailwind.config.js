module.exports = {
  mode: "jit",
  separator: "_",
  purge: {
    content: ["./src/**/*.pug", "./src/**/*.{js,jsx,ts,tsx,vue}"],
    options: {
      safelist: [],
      blocklist: [/^debug-/],
      keyframes: false,
      fontFace: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        mainColor: "#001A49",
        accent: "#C50EFF",
      },
      zIndex: {
        "-1": "-1",
      },
      rotate: {
        135: "135deg",
        "-135": "-135deg",
      },
      color: {
        accent: "#C50EFF",
        1: "#001A49",
        2: "#0EB500",
      },
      borderRadius: {
        main: "20px",
        "main-2": "33px",
      },
      backgroundImage: {
        "gradient-1":
          "linear-gradient(44.11deg, #CD10FF 15.75%, #9F06FF 84.63%)",
        "gradient-2":
          "linear-gradient(63.5deg, #001A4925 13.21%, #AF0AFF25 42.41%, #FFFFFF25 79.95%)",
        "gradient-2-reverse":
          "linear-gradient(63.5deg, #FFFFFF25 13.21%, #AF0AFF25 42.41%, #001A4925 79.95%)",
        "gradient-3":
          "linear-gradient(44.11deg, #CD10FF25 15.75%, #9F06FF25 84.63%)",
        "gradient-4":
          "linear-gradient(63.5deg, #001A4925 17.96%, #AF0AFF25 83.37%);",
        "gradient-4-reverse":
          "linear-gradient(63.5deg, #AF0AFF25 17.96%, #001A4925 83.37%);",
        "gradient-5":
          "linear-gradient(44.11deg, #CD10FF0C 15.75%, #9F06FF0C 84.63%)",
      },
      boxShadow: {
        "1-inner":
          "0px -1px 12px rgba(0, 0, 0, 0.25), inset 0px -3px 2px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
        2: "0px 3px 44px #818A8C",
        3: "0px 32px 44px #818A8C",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
