import SignUp from '@/components/SignUp'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

const SignUpPage = () => {
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
          <ChevronLeft className="mr-2 h-4 w-4" />
        </Link>

        <SignUp />
      </div>
    </div>
  )
}

export default SignUpPage
