const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  optimizeFonts: false,
  images: {
    domains: [
      '193.46.199.82',
      'assets.vercel.com', 
      'placehold.it', 
      'images.unsplash.com'
    ],
    formats: ['image/avif', 'image/webp'],
  },
}