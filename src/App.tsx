import * as React from 'react'
import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react'
import Posts from './components/Posts'
import Header from './components/Header'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box>
      <Grid minH="100vh" gridTemplateRows="70px 1fr" gridRowGap="2rem">
        <Header />
        <VStack spacing={8}>
          <Posts />
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
