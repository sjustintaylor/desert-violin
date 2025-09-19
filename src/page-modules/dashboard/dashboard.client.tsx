"use client";

import { DashboardView } from "./dashboard.view";
import { useDashboard } from "./dashboard.hook";

export function DashboardClient({ serverData }: { serverData: any }) {
  const pageLogic = useDashboard({ serverData });

  return <DashboardView {...pageLogic} />;
}
