import { getDashboardData, DashboardServerComponent } from '@/page-modules/dashboard/dashboard.server';
import { ClientMount } from '@/page-modules/dashboard/dashboard.client';

export default async function Dashboard() {
  const serverData = await getDashboardData();

  return (
    <div>
      <DashboardServerComponent data={serverData} />
      <ClientMount serverData={serverData} />
    </div>
  );
}