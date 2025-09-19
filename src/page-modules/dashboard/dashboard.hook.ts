import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from '@/lib/auth-client';
import type { DashboardServerData, Session } from '@/types/auth';

interface UseDashboardProps {
  serverData: DashboardServerData;
  session: Session;
}

export function useDashboard({ serverData, session }: UseDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { data: clientSession, isPending } = useSession();

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return {
    serverData,
    session: clientSession || session,
    selectedTab,
    isLoggingOut,
    isLoading: isPending,
    handleTabChange,
    handleLogout,
    handleRefresh,
  };
}