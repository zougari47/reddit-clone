'use client'

import { useCustomToast } from '@/hooks/use-custom-toast'
import { usePrevious } from '@mantine/hooks'
import { CommentVote, VoteType } from '@prisma/client'
import { FC, useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { CommentVoteRequest } from '@/lib/validators/vote'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'

interface ICommentVote {
  commentId: string
  initialVoteAmt: number
  initialVote?: Pick<CommentVote, 'type'>
}

const CommentVote: FC<ICommentVote> = ({
  commentId,
  initialVoteAmt,
  initialVote,
}) => {
  const { loginToast } = useCustomToast()
  const [votesAmt, setVotesAmt] = useState<number>(initialVoteAmt)
  const [currentVote, setCurrentVote] = useState(initialVote)
  const prevVote = usePrevious(currentVote)

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: CommentVoteRequest = {
        commentId,
        voteType,
      }
      await axios.patch('/api/subreddit/post/comment/vote', payload)
    },
    onError: (err, VoteType) => {
      if (VoteType === 'UP') {
        setVotesAmt(prev => prev - 1)
      } else {
        setVotesAmt(prev => prev + 1)
      }

      // reset current vote
      setCurrentVote(prevVote)

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: 'Something went wrong',
        description: 'Your vote was not registered, please try again.',
        variant: 'destructive',
      })
      // setVotesAmt(prev => prev + (VoteType === 'UP' ? 1 : -1))
    },
    onMutate: type => {
      if (currentVote?.type === type) {
        setCurrentVote(undefined)
        if (type === 'UP') setVotesAmt(prev => prev - 1)
        else if (type === 'DOWN') setVotesAmt(prev => prev + 1)
      } else {
        setCurrentVote({ type })
        if (type === 'UP') setVotesAmt(prev => prev + (currentVote ? 2 : 1))
        else if (type === 'DOWN')
          setVotesAmt(prev => prev - (currentVote ? 2 : 1))
      }
    },
  })

  return (
    <div className="flex gap-1">
      <Button
        size="sm"
        onClick={() => vote('UP')}
        variant="ghost"
        aria-label="up vote"
      >
        <ArrowBigUp
          className={cn('h-5 w-5 text-zinc-700', {
            'text-emerald-500 fill-emerald-500': currentVote?.type === 'UP',
          })}
        />
      </Button>

      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {votesAmt}
      </p>

      <Button
        onClick={() => vote('DOWN')}
        size="sm"
        variant="ghost"
        aria-label="down vote"
      >
        <ArrowBigDown
          className={cn('h-5 w-5 text-zinc-700', {
            'text-red-500 fill-red-500': currentVote?.type === 'DOWN',
          })}
        />
      </Button>
    </div>
  )
}

export default CommentVote
