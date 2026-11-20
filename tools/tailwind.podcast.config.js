// Same settings podcast.html used to give the Tailwind CDN (the home page's "against" colours)
module.exports = {
  content: ['./podcast.html', './build-podcast.py'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], serif: ['"Playfair Display"', 'Georgia', 'serif'] },
      colors: {
        paper: '#faf7f2', ink: '#1c1c1f', inkdeep: '#111113', muted: '#57575c', faint: '#85858a',
        line: '#e8dcd4', grid: '#f0e8de', accent: '#c8322a', accenthover: '#a62820', accentsoft: '#fad4cf',
      },
    },
  },
};
