import React, { useEffect, useState } from 'react'
import usePosts from '../hooks/usePosts'
import { Box, Spinner } from '@chakra-ui/react'
import { Post } from '../config/types'
import { useIntersection } from 'react-use'
import SinglePost from './SinglePost'

const NUM_POSTS_TO_SHOW = 15

const Posts = () => {
  const { posts, translatedPosts, getPosts } = usePosts()
  const [postsToShow, setPostsToShow] = useState<number>(15)

  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  })

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    if (intersection && intersection.isIntersecting && !!posts.length) {
      setPostsToShow(postsToShow + NUM_POSTS_TO_SHOW)
    }
  }, [intersection])

  const postsToRender = !!translatedPosts.length ? translatedPosts : posts

  return (
    <Box maxWidth="700px">
      {!!postsToRender.length ? (
        postsToRender
          .slice(0, postsToShow)
          .map((post: Post, index: number) => <SinglePost key={index} {...post} />)
      ) : (
        <Spinner size="xl" />
      )}
      <Box ref={intersectionRef} />
    </Box>
  )
}

export default Posts
