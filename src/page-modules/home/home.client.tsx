"use client";

import { HomeView } from "./home.view";
import { useHome } from "./home.hook";
import type { HomeServerData } from '@/types/auth';

export function HomeClient({ serverData }: { serverData: HomeServerData }) {
  const pageLogic = useHome({ serverData });

  return <HomeView {...pageLogic} />;
}
