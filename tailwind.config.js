/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Scan all files in the src directory
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        seoulnamsan: ['SeoulNamsan', 'sans-serif'], // Placeholder
        inter: ['Inter', 'sans-serif'],
        inconsolata: ['Inconsolata', 'monospace'],
        montserrat: ['Montserrat', 'sans-serif'],
      },

      scale: {
        '102': '1.02', // Custom scale value
        '103': '1.03', // Add more if needed
        '105.5': '1.055', // Example of precise scaling
      },
      
      backgroundImage: {
        'custom-image': "url('/background.png')",
      },
      height: {
        'custom-height': 'calc(100vh - 60px)', // Custom value
      },
      width: {
        'custom-width': 'calc(100vw - 250px)',
      },
      screens: {
        // Laptops L: For screens from 1440px and up to 2000px
        'Laptops_L': {'min': '1440px', 'max': '2000px'},
        
        // Laptops: For screens from 1024px and up to 1440px
        'Laptops': {'min': '1024px', 'max': '1440px'},
        
        // 4k: For screens from 2000px and up to 2560px
        '4k': {'min': '2000px'},

        
          'lg-1440': { min: '1024px', max: '1440px' }, // Custom range for 1024px to 1440px
          'xl-2560': { min: '1441px', max: '2560px' }, // Custom range for 1441px to 2560px
          '2xl-above': '2561px', // Screens above 2560px
    
        // 4kplus: For screens from 2560px and up to 3000px
        // '4kplus': {'min': '2560px', 'max': '3000px'}
      },
      textShadow: {
        'sm': '1px 1px 2px rgba(0, 0, 0, 0.5)',
        'DEFAULT': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.5)',
      },
      // Custom scrollbar-hide utility
      scrollbar: {
        hide: {
          '::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari, and Opera
          '-ms-overflow-style': 'none',               // IE and Edge
          'scrollbar-width': 'none',                  // Firefox
        },
      },
    },
  },
  plugins: [
    require('daisyui'), // Integrate DaisyUI plugin
    require('tailwindcss-textshadow'), // Integrate text shadow plugin
    // Custom plugin to add the scrollbar-hide utility
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      });
    },
  ],
}
