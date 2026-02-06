import { DashboardOverview } from '@/types/ubuntu-dashboard'
import { getGitHubOverview } from '@/lib/ubuntu-dashboard/fetchers/github'
import { getCommunityOverview } from '@/lib/ubuntu-dashboard/aggregations/community'
import { getHealthScore } from '@/lib/ubuntu-dashboard/scoring/healthScore'
import { getRefreshMetadata } from '@/lib/ubuntu-dashboard/refresh'
import OverviewClient from './OverviewClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getDashboardData(): Promise<Partial<DashboardOverview>> {
  const [healthScore, github, community, refresh] = await Promise.all([
    getHealthScore(),
    getGitHubOverview(),
    getCommunityOverview(),
    getRefreshMetadata(),
  ])

  return {
    healthScore: healthScore || undefined,
    github: github || undefined,
    community: community || undefined,
    refresh,
  }
}

export default async function OverviewPage() {
  const data = await getDashboardData()

  return <OverviewClient initialData={data} />
}
