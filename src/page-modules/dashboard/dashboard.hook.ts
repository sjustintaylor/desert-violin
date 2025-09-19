import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useDashboard({ serverData }: { serverData: any }) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleLogout = () => {
    router.push('/');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return {
    serverData,
    selectedTab,
    handleTabChange,
    handleLogout,
    handleRefresh,
  };
}