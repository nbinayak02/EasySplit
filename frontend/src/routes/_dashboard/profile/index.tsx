import ProfilePage from '@/features/profile/Profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/profile/')({
  component: ProfilePage,
})
