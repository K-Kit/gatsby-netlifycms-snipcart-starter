import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { CssBaseline } from '@material-ui/core'

const theme = {
  space: [0, 2, 4, 8, 16, 32],
  colors: {
    blue: '#07c',
    tomato: 'tomato',
    success: 'lightgreen',
    primary: 'red',
  },
}

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <>
      <CssBaseline />
      {element}
    </>
  </ThemeProvider>
)
