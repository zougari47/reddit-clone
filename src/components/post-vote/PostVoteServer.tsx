import { getAuthSession } from '@/lib/auth'
import { Post, Vote, VoteType } from '@prisma/client'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import PostVoteClient from './PostVoteClient'

interface IPostVoteServer {
  postId: string
  initialVotesAmt: number
  initialVote?: VoteType | null
  getData?: () => Promise<(Post & { Votes: Vote[] }) | null>
}

const PostVoteServer = async ({
  postId,
  initialVotesAmt,
  initialVote,
  getData,
}: IPostVoteServer) => {
  const session = await getAuthSession()

  let _votesAmt: number = 0
  let _currentVote: VoteType | null | undefined = undefined

  if (getData) {
    const post = await getData()
    if (!post) return notFound()

    _votesAmt = post.Votes.reduce((acc, vote) => {
      if (vote.type === 'UP') return acc + 1
      if (vote.type === 'DOWN') return acc - 1
      return acc
    }, 0)

    _currentVote = post.Votes.find(
      vote => vote.userId === session?.user.id
    )?.type
  } else {
    _votesAmt = initialVotesAmt!
    _currentVote = initialVote
  }

  return (
    <PostVoteClient
      initialVoteAmt={_votesAmt}
      postId={postId}
      initialVote={_currentVote}
    />
  )
}

export default PostVoteServer
