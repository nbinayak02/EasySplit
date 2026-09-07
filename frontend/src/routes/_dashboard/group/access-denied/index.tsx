import { GroupAccessDenied } from '@/features/groups/pages/Group-Access-Denied'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/group/access-denied/')({
  component: GroupAccessDenied,
})