import SignIn from '@/components/SignIn'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <div className="inset-0 absolute">
      <div className="h-full max-w-2xl mx-auto flex flex-col item-center justify-center gap-20">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'self-start -mt-20'
          )}
        >
          Home
        </Link>

        <SignIn />
      </div>
    </div>
  )
}

export default LoginPage
