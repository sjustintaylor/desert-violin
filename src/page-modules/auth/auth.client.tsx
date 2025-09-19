'use client';

import { useAuth } from "./auth.hook";
import { AuthView } from "./auth.view";

interface AuthClientProps {
  serverData?: Record<string, unknown>;
}

export function AuthClient({ serverData }: AuthClientProps) {
  const authLogic = useAuth({ serverData });

  return <AuthView {...authLogic} />;
}