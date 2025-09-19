'use client';

import { PageView } from './home.view';
import { useHome } from './home.hook';

export function ClientMount({ serverData }: { serverData: any }) {
  const pageLogic = useHome({ serverData });

  return <PageView {...pageLogic} />;
}