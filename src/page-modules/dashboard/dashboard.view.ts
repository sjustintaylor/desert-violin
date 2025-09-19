interface PageViewProps {
  serverData: any;
  selectedTab: string;
  handleTabChange: (tab: string) => void;
  handleLogout: () => void;
  handleRefresh: () => void;
}

export function PageView({
  serverData,
  selectedTab,
  handleTabChange,
  handleLogout,
  handleRefresh
}: PageViewProps) {
  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'projects', name: 'Projects' },
    { id: 'activity', name: 'Activity' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-foreground/10 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                className="text-sm text-foreground/70 hover:text-foreground"
              >
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="rounded-md bg-foreground/10 px-3 py-2 text-sm font-medium text-foreground hover:bg-foreground/20"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="border-b border-foreground/10 pb-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {serverData.user.name}!
          </h1>
          <p className="mt-2 text-foreground/60">
            Here's what's happening with your projects
          </p>
        </div>

        <div className="mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-foreground/60 hover:text-foreground hover:border-foreground/30'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="bg-foreground/5 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-foreground">Total Projects</h3>
                    <p className="text-3xl font-bold text-foreground mt-2">
                      {serverData.stats.totalProjects}
                    </p>
                  </div>
                  <div className="bg-foreground/5 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-foreground">Active</h3>
                    <p className="text-3xl font-bold text-foreground mt-2">
                      {serverData.stats.activeProjects}
                    </p>
                  </div>
                  <div className="bg-foreground/5 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-foreground">Completed Tasks</h3>
                    <p className="text-3xl font-bold text-foreground mt-2">
                      {serverData.stats.completedTasks}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'projects' && (
              <div className="bg-foreground/5 rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-4">Your Projects</h3>
                <p className="text-foreground/60">Project management features coming soon...</p>
              </div>
            )}

            {selectedTab === 'activity' && (
              <div className="bg-foreground/5 rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {serverData.recentActivity.map((activity: any) => (
                    <div key={activity.id} className="flex justify-between items-center py-2">
                      <span className="text-foreground">{activity.action}</span>
                      <span className="text-foreground/60 text-sm">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="text-lg font-medium text-foreground mb-4">Profile</h3>
              <div className="space-y-2">
                <p className="text-foreground"><strong>Name:</strong> {serverData.user.name}</p>
                <p className="text-foreground"><strong>Email:</strong> {serverData.user.email}</p>
              </div>
            </div>

            <div className="bg-foreground/5 rounded-lg p-6">
              <h3 className="text-lg font-medium text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-foreground/10 rounded">
                  Create New Project
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-foreground/10 rounded">
                  View Reports
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-foreground/10 rounded">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}