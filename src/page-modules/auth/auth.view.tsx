import { useState } from "react";

import type { Session } from '@/types/auth';

interface AuthViewProps {
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleSignUp: (email: string, password: string, name: string) => Promise<void>;
  handleSignOut: () => Promise<void>;
  handleSocialSignIn: (provider: 'github' | 'google') => Promise<void>;
  isAuthenticated: boolean;
}

export function AuthView({
  session,
  isLoading,
  error,
  handleSignIn,
  handleSignUp,
  handleSignOut,
  handleSocialSignIn,
  isAuthenticated,
}: AuthViewProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'signin') {
      await handleSignIn(formData.email, formData.password);
    } else {
      await handleSignUp(formData.email, formData.password, formData.name);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
        <div className="mb-4">
          <p className="text-gray-600">Signed in as:</p>
          <p className="font-semibold">{session?.user?.email}</p>
          {session?.user?.name && (
            <p className="text-gray-800">{session.user.name}</p>
          )}
        </div>
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {mode === 'signin' ? 'Sign In' : 'Sign Up'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading
            ? (mode === 'signin' ? 'Signing in...' : 'Signing up...')
            : (mode === 'signin' ? 'Sign In' : 'Sign Up')
          }
        </button>
      </form>

      <div className="mt-4 space-y-2">
        <div className="text-center text-gray-600">or</div>

        <button
          onClick={() => handleSocialSignIn('github')}
          disabled={isLoading}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Continue with GitHub
        </button>

        <button
          onClick={() => handleSocialSignIn('google')}
          disabled={isLoading}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Continue with Google
        </button>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="text-blue-500 hover:text-blue-600 underline"
        >
          {mode === 'signin'
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"
          }
        </button>
      </div>
    </div>
  );
}