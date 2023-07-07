import { z } from 'zod'

export const PostVoteValidator = z.object({
  postId: z.string(),
  VoteType: z.enum(['UP', 'DOWN']),
})

export type PostVoteRequest = z.infer<typeof PostVoteValidator>

export const CommentVoteValidator = z.object({
  postId: z.string(),
  CommentType: z.enum(['UP', 'DOWN']),
})

export type CommentRequest = z.infer<typeof CommentVoteValidator>
