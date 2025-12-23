/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/js/*.js"],
  theme: {
    extend: {
      colors: {
        // Colors inspired by the poster
        'biryani-maroon': '#4A1515',
        'biryani-red': '#6B1D1D',
        'biryani-dark': '#2B0A0A',
        'biryani-orange': '#FF8C42',
        'biryani-yellow': '#FFD447',
        'biryani-cream': '#FFF8E7',
        'biryani-gold': '#F4A261',
        'biryani-green': '#2D5016',
      },
      fontFamily: {
        'funky': ['Fredoka', 'Poppins', 'sans-serif'],
        'heading': ['Berkshire Swash', 'cursive'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'steam': 'steam 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'translateY(-50px) scale(1.2)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255, 140, 66, 0.5)',
        'glow-yellow': '0 0 20px rgba(255, 212, 71, 0.5)',
      }
    },
  },
  plugins: [],
}
