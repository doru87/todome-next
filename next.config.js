/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: ['todome.ro']
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["ro", "gb", "fr", "de"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "ro",
    localeDetection: true,
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    domains: [
      {
        domain: "todome.ro",
        defaultLocale: "ro",
      },
      // {
      //   domain: "todome.gb",
      //   defaultLocale: "gb",
      // },
      {
        domain: "todome.fr/de",
        defaultLocale: "de",
      },
      {
        domain: "todome.fr",
        defaultLocale: "fr",
        // an optional http field can also be used to test
        // locale domains locally with http instead of https
        http: true,
      },
    ],
  },
}


module.exports = nextConfig
