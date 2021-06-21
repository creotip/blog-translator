import React from 'react'
import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { ReactComponent as Logo } from '../assets/suridata.svg'
import LocaleSwitcher from './LocaleSwitcher'

const Header = () => {
  const mode = useColorModeValue('dark', 'light')
  return (
    <Flex
      justify="space-between"
      alignItems="center"
      p="0 1rem"
      borderBottom="1px solid #ebeeee"
      position="sticky"
      top="0"
      bg={mode === 'light' ? '#1a212c' : 'white'}
      zIndex="12"
    >
      <ColorModeSwitcher />
      <Box width="150px">
        <Logo />
      </Box>
      <LocaleSwitcher />
    </Flex>
  )
}

export default Header
