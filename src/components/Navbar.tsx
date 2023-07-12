import Link from 'next/link'
import { Icons } from '@/components/Icons'
import { buttonVariants } from './ui/Button'
import { getAuthSession } from '@/lib/auth'
import UserAccountNav from './UserAccountNav'
import SearchBar from './SearchBar'

const Navbar = async () => {
  const session = await getAuthSession()
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-zinc-300 z-10 py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-2 w-8 sm:h-6 sm:2-6" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Reddit2
          </p>
        </Link>

        {/* search bar */}
        <SearchBar />

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href="/login" className={buttonVariants()}>
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
