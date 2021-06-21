import React, { useEffect, useState } from 'react'
import { translatorApiKey, translatorApiUrl, translatorLocation } from '../config'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/config'
import { Post } from '../config/types'
import { actionTypes } from '../redux/actions/general'
import { transformPosts } from '../utils'
import { useToast } from '@chakra-ui/react'

const limit = 25

const useTranslator = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { posts, locale } = useSelector((state: RootState) => state.general)
  const dispatch = useDispatch()
  const toast = useToast()

  const translatePosts = async (locale: string) => {
    setIsLoading(true)

    let promisesIntervals = new Array(posts.length / limit).fill(limit)
    let promisesArray: any[] = []
    let promisesOffset = 0

    promisesIntervals.forEach(() => {
      promisesArray = [
        ...promisesArray,
        axios({
          baseURL: translatorApiUrl,
          url: '/translate',
          method: 'post',
          headers: {
            'Ocp-Apim-Subscription-Key': translatorApiKey,
            'Ocp-Apim-Subscription-Region': translatorLocation,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString(),
          },
          params: {
            'api-version': '3.0',
            to: [locale],
          },
          data: posts.slice(promisesOffset, promisesOffset + limit).map((post: Post) => {
            return {
              text: `${post.title}^${post.body}`,
            }
          }),
          responseType: 'json',
        }).then(function (response) {
          return response.data
        }),
      ]

      promisesOffset = promisesOffset + limit
    })

    try {
      setIsLoading(true)
      const response = await Promise.all(promisesArray)
      let data: any[] = []
      response.forEach(item => {
        data = [...data, ...item]
      })

      dispatch({
        type: actionTypes.SET_TRANSLATED_POSTS,
        payload: [...transformPosts(data)],
      })
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
  return {
    translatePosts,
    isLoading,
  }
}

export default useTranslator
