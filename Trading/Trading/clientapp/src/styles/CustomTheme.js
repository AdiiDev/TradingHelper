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
      },
    },
  },
})
