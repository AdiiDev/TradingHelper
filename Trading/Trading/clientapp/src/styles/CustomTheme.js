//https://codesandbox.io/s/64705335-how-to-style-body-element-in-materialui-mo9yi?file=/demo.js

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.9em',
          whiteSpace: 'pre-line',
        },
        pooper: {
          top: 0
        }
      },
    },
    /*
    MuiCssBaseline: {
      styleOverrides: `
        h1 {
          color: grey;
        }
        .MuiButtonBase-root {
          background-color: red !important;
        }
      `,
    },*/
  },
})
