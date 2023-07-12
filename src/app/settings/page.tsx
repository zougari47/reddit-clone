import UserNameForm from '@/components/UserNameForm'
import { authOptions, getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

const SettingsPage = async () => {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || '/sign-in')
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="grid items-start gap-8">
        <div className="font-bold text-3xl md:text-4xl mb-4">Settings</div>
      </div>

      <div className="grid gap-10">
        <UserNameForm
          user={{
            id: session.user.id,
            name: session.user.username || '',
          }}
        />
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Settings',
  description: 'Manage account and website settings.',
}

export default SettingsPage
