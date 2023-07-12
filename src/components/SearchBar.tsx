'use client'

import { useQuery } from '@tanstack/react-query'
import { Command, CommandInput, CommandList } from './ui/Command'
import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Subreddit, Prisma } from '@prisma/client'
import { CommandEmpty, CommandGroup, CommandItem } from 'cmdk'
import { usePathname, useRouter } from 'next/navigation'
import { Users } from 'lucide-react'
import debounce from 'lodash.debounce'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

const SearchBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const commandRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState<string>('')

  const request = debounce(() => {
    refetch()
  }, 300)

  const debounceRequest = useCallback(() => {
    request()
  }, [])

  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!input) return []
      const { data } = await axios.get(`/api/search?q=${input}`)
      return data as (Subreddit & {
        _count: Prisma.SubredditCountOutputType
      })[]
    },
    queryKey: ['search-query'],
    enabled: false,
  })

  useOnClickOutside(commandRef, () => {
    setInput('')
  })

  useEffect(() => {
    setInput('')
  }, [pathname])

  return (
    <Command
      ref={commandRef}
      className="relative rounded-lg border max-w-lg z-50 overflow-visible"
    >
      <CommandInput
        value={input}
        onValueChange={txt => {
          setInput(txt)
          debounceRequest()
        }}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search communities..."
      />

      {input.length > 0 ? (
        <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md p-3">
          {isFetched && <CommandEmpty>No results founds.</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Communities">
              {queryResults?.map(subreddit => (
                <CommandItem
                  className="flex"
                  key={subreddit.id}
                  onSelect={txt => {
                    router.push(`/r/${txt}`)
                    router.refresh()
                  }}
                  value={subreddit.name}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <a href={`/r/${subreddit.name}`}>{subreddit.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      ) : null}
    </Command>
  )
}

export default SearchBar
