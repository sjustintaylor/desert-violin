interface PageViewProps {
  serverData: any;
  handleLogin: () => void;
  handleRegister: () => void;
}

export function HomeView({
  serverData,
  handleLogin,
  handleRegister,
}: PageViewProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              {serverData.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/70">
              {serverData.tagline}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={handleLogin}
                className="rounded-md bg-foreground px-3.5 py-2.5 text-sm font-semibold text-background shadow-sm hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className="text-sm font-semibold leading-6 text-foreground hover:text-foreground/80"
              >
                Register <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
