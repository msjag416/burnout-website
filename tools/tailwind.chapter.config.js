// Same settings chapter-one.html used to give the Tailwind CDN
module.exports = {
  content: ['./chapter-one.html'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'], serif: ['Merriweather', 'serif'] },
      colors: { amber: { 50: '#fffbf0' }, stone: { 950: '#0c0a09' } },
    },
  },
};
