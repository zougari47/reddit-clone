import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import { db } from '@/lib/db'
import PostFeed from './PostFeed'
import { getAuthSession } from '@/lib/auth'

const CustomFeed = async () => {
  const session = await getAuthSession()

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      subreddit: true,
    },
  })

  const followedCommunitiesIds = followedCommunities.map(
    ({ subreddit }) => subreddit.id
  )

  const posts = await db.post.findMany({
    where: {
      Subreddit: {
        id: {
          in: followedCommunitiesIds,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Votes: true,
      author: true,
      comments: true,
      Subreddit: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  })

  return <PostFeed initialPosts={posts} />
}

export default CustomFeed
