import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/config'
import { useFetch } from 'use-http'
import { postsApiUrl } from '../config'
import { actionTypes } from '../redux/actions/general'
import { Post } from '../config/types'
import { useToast } from '@chakra-ui/react'

export const usePosts = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { posts, translatedPosts } = useSelector((state: RootState) => state.general)
  const { error, response, get } = useFetch(postsApiUrl)
  const dispatch = useDispatch()
  const toast = useToast()

  const getPosts = async () => {
    try {
      setIsLoading(true)
      const posts = await get()
      if (response.ok) {
        dispatch({
          type: actionTypes.SET_POSTS,
          payload: posts,
        })
      }
    } catch (err) {
      toast({
        title: `Something went wrong!`,
        status: 'error',
        isClosable: true,
        position: 'top',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deletePost = (id: number) => {
    if (!!translatedPosts.length) {
      const filteredPosts = translatedPosts.filter((post: Post) => post.id !== id)
      dispatch({
        type: actionTypes.SET_TRANSLATED_POSTS,
        payload: filteredPosts,
      })
    } else {
      const filteredPosts = posts.filter((post: Post) => post.id !== id)
      dispatch({
        type: actionTypes.SET_POSTS,
        payload: filteredPosts,
      })
    }
  }

  return {
    getPosts,
    deletePost,
    posts,
    translatedPosts,
    isLoading,
    error,
  }
}

export default usePosts
