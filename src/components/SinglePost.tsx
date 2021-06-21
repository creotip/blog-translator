import React, { useState } from 'react'
import { Post } from '../config/types'
import {
  Box,
  Flex,
  IconButton,
  SimpleGrid,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialogBody,
  Button,
} from '@chakra-ui/react'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import usePosts from '../hooks/usePosts'
import { AiOutlineDelete } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/config'

const SinglePost = ({ title, body, id }: Post) => {
  const { locale } = useSelector((state: RootState) => state.general)
  const [thumbsCounter, setThumbsCounter] = useState(0)
  const { deletePost } = usePosts()
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  return (
    <SimpleGrid
      key={id}
      gridTemplateColumns="50px 1fr"
      gridColumnGap={10}
      mb="3rem"
      border="1px solid #e6e6e6"
      borderRadius="10px"
      p="2rem"
      position="relative"
    >
      <IconButton
        onClick={() => setIsOpen(true)}
        aria-label="delete post"
        icon={<AiOutlineDelete color="#C53030" />}
        position="absolute"
        right={0}
        borderTopRightRadius={10}
      />

      <Flex flexDirection="column" justifyContent="center">
        <IconButton
          onClick={() => setThumbsCounter(thumbsCounter + 1)}
          aria-label="thumbs up"
          icon={<FaThumbsUp color="#2F855A" />}
        />
        <Box
          textAlign="center"
          color={thumbsCounter > 0 ? '#2F855A' : thumbsCounter < 0 ? '#C53030' : 'inherit'}
        >
          {thumbsCounter}
        </Box>
        <IconButton
          onClick={() => setThumbsCounter(thumbsCounter - 1)}
          aria-label="thumbs down"
          icon={<FaThumbsDown color="#C53030" />}
        />
      </Flex>
      <Box textAlign={locale === 'he' ? 'right' : 'left'} pr="2rem">
        <Box fontWeight="bold" mb="1rem">
          {title}
        </Box>
        <Box fontSize="1rem">{body}</Box>
      </Box>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef as any} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody py="2rem">
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef as any} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => deletePost(id as number)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </SimpleGrid>
  )
}

export default SinglePost
