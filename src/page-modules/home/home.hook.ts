import { useRouter } from 'next/navigation';

export function useHome({ serverData }: { serverData: any }) {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/dashboard');
  };

  const handleRegister = () => {
    router.push('/dashboard');
  };

  return {
    serverData,
    handleLogin,
    handleRegister,
  };
}