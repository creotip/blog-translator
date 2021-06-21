import { Post } from '../config/types'

interface Translation {
  text: string
  to: string
}

interface translationObject {
  detectedLanguage: {
    language: string
    score: number
  }
  translations: Translation[]
}

export const transformPosts = (chunkedPosts: translationObject[]) => {
  let posts: Post[] = []

  chunkedPosts.forEach(item => {
    let post: Post = {
      title: '',
      body: '',
    }

    const titleBody = item.translations?.[0].text.split('^')

    post.title = titleBody?.[0] as string
    post.body = titleBody?.[1] as string

    posts = [...posts, post]
  })

  return posts
}
