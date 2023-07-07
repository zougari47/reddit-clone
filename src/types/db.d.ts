import type { Post, Subreddit, User, Vote, Comment } from '@prisma/client'

export type ExtendedPost = Post & {
  Subreddit: Subreddit
  Votes: Vote[]
  author: User
  comments: Comment[]
}
