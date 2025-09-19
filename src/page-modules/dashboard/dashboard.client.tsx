"use client";

import { DashboardView } from "./dashboard.view";
import { useDashboard } from "./dashboard.hook";
import type { DashboardServerData, Session } from '@/types/auth';

interface DashboardClientProps {
  serverData: DashboardServerData;
  session: Session;
}

export function DashboardClient({ serverData, session }: DashboardClientProps) {
  const pageLogic = useDashboard({ serverData, session });

  return <DashboardView {...pageLogic} />;
}
