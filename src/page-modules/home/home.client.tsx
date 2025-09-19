"use client";

import { HomeView } from "./home.view";
import { useHome } from "./home.hook";

export function HomeClient({ serverData }: { serverData: any }) {
  const pageLogic = useHome({ serverData });

  return <HomeView {...pageLogic} />;
}
