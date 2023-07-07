import { FC } from 'react'

interface IPost {
  subredditName: string
}

const Post: FC<IPost> = ({ subredditName }) => {
  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        {/* TODO: PostVotes */}

        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">sub</div>
        </div>
      </div>
    </div>
  )
}

export default Post
