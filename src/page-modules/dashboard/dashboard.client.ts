'use client';

import { PageView } from './dashboard.view';
import { useDashboard } from './dashboard.hook';

export function ClientMount({ serverData }: { serverData: any }) {
  const pageLogic = useDashboard({ serverData });

  return <PageView {...pageLogic} />;
}