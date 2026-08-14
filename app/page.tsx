import { getFarmingData, seedFarmingData } from './actions/farming'
import { FarmingDashboard } from '@/components/farming-dashboard'

export const dynamic = 'force-dynamic'

export default async function Home() {
  await seedFarmingData()
  const data = await getFarmingData()
  return <FarmingDashboard initialData={data} />
}
