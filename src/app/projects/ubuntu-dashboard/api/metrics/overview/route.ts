import { NextResponse } from 'next/server'
import { getGitHubOverview } from '@/lib/ubuntu-dashboard/fetchers/github'
import { getCommunityOverview } from '@/lib/ubuntu-dashboard/aggregations/community'
import { getHealthScore } from '@/lib/ubuntu-dashboard/scoring/healthScore'
import { getRefreshMetadata } from '@/lib/ubuntu-dashboard/refresh'
import { DashboardOverview } from '@/types/ubuntu-dashboard'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const [healthScore, github, community, refresh] = await Promise.all([
      getHealthScore(),
      getGitHubOverview(),
      getCommunityOverview(),
      getRefreshMetadata(),
    ])

    // Return null-safe data
    const response: Partial<DashboardOverview> = {
      healthScore: healthScore || undefined,
      github: github || undefined,
      community: community || undefined,
      refresh,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching overview:', error)
    return NextResponse.json(
      { error: 'Failed to fetch overview data' },
      { status: 500 }
    )
  }
}
