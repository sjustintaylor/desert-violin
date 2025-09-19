import { useState } from "react";
import { signIn, signUp, signOut, useSession } from "@/lib/auth-client";

interface UseAuthProps {
  serverData?: Record<string, unknown>;
}

export function useAuth({}: UseAuthProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, isPending } = useSession();

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || 'An error occurred');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        setError(result.error.message || 'An error occurred');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signOut();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'github' | 'google') => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn.social({
        provider,
      });

      if (result.error) {
        setError(result.error.message || 'An error occurred');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    session,
    isLoading: isLoading || isPending,
    error,
    handleSignIn,
    handleSignUp,
    handleSignOut,
    handleSocialSignIn,
    isAuthenticated: !!session?.user,
  };
}