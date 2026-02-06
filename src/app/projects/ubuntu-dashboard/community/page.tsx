import { getCommunityOverview } from '@/lib/ubuntu-dashboard/aggregations/community'
import CommunityClient from './CommunityClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CommunityPage() {
  const community = await getCommunityOverview()

  return <CommunityClient community={community} />
}
