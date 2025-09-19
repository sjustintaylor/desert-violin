import { useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import type { HomeServerData } from '@/types/auth';

export function useHome({ serverData }: { serverData: HomeServerData }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleLogin = () => {
    router.push('/auth');
  };

  const handleRegister = () => {
    router.push('/auth');
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  return {
    serverData,
    session,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
    handleLogin,
    handleRegister,
    handleGoToDashboard,
    handleSignOut,
  };
}