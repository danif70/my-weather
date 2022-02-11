import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Weather from './Components/Weather.jsx'

import theme from './theme.js'

function App() {
  
  return (
    <ChakraProvider theme={theme}>
      <Weather />
    
    </ChakraProvider>
  )
}

export default App;
