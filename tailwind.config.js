module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    options: {
      whitelistPatterns: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/
      ]
    },
    content: ["./public/**/*.html", "./src/**/*.vue"]
  },
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
};
