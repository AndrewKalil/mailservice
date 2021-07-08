module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        login: "url('/src/assets/images/bgfull.jpg')",
      }),
      height: {
        xl: "32rem",
        "19/20": "95%",
      },
      width: {
        "19/20": "95%",
        ".45": "45%",
        modalLength: "30rem",
      },
      zIndex: {
        1000: 1000,
      },
      colors: {
        medianoche: "#000032",
        lavanda: "#645ABE",
        aciano: "#7896FA",
        azul: "#6EA0E6",
        gris: "#DCE6E6",
        grisClaro: "#787878",
        lila: "#F0F0FA",
        peach: "#FFEBDC",
        amarillo: "#FABE32",
        naranja: "#FAA050",
        azulMedio: "#3948FF",
        cielo: "#F5FAFF",
        space: "#3C6EBE",
      },
      boxShadow: {
        //     sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        //     DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        //     md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        //     lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        //     xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        //     '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        //    '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        inner: "inset 0px 0px 8px #AAB4B4",
        button: "2px 2px 4px #AAB4B4",
        navShadow: "2px 1px 8px rgba(138, 167, 196, 0.5)",
        // none: 'none',
      },
      borderRadius: {
        //     'none': '0',
        //    'sm': '0.125rem',
        //    DEFAULT: '0.25rem',
        //    DEFAULT: '4px',
        //    'md': '0.375rem',
        //    'lg': '0.5rem',
        //    'full': '9999px',
        large: "10px",
      },
      fontSize: {
        md: ".925rem",
        large: "1.125rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
