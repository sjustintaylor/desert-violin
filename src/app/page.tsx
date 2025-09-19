import { getHomeData, HomeServerComponent } from '@/page-modules/home/home.server';
import { ClientMount } from '@/page-modules/home/home.client';

export default async function Home() {
  const serverData = await getHomeData();

  return (
    <div>
      <HomeServerComponent data={serverData} />
      <ClientMount serverData={serverData} />
    </div>
  );
}
