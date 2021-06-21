import React from 'react'
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Spinner } from '@chakra-ui/react'
import { BiChevronDown } from 'react-icons/bi'
import { localeKeys } from '../config'
import useLocale from '../hooks/useLocale'
import useTranslator from '../hooks/useTranslator'

const LocaleSwitcher = () => {
  const { locale, setLocale } = useLocale()
  const { translatePosts, isLoading } = useTranslator()

  const handleLocale = (localeKey: string) => {
    setLocale(localeKey)
    translatePosts(localeKey)
  }

  return (
    <Box>
      <Menu>
        <MenuButton as={Button} rightIcon={isLoading ? <Spinner size="md" /> : <BiChevronDown />}>
          {locale ? locale : 'Translate to'}
        </MenuButton>
        <MenuList>
          {Object.keys(localeKeys).map((item: string) => (
            <MenuItem key={item} onClick={() => handleLocale(item)}>
              {localeKeys[item]}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default LocaleSwitcher
