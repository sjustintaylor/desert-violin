export async function getDashboardData() {
  return {
    user: {
      name: "User",
      email: "user@example.com"
    },
    stats: {
      totalProjects: 12,
      activeProjects: 3,
      completedTasks: 47
    },
    recentActivity: [
      { id: 1, action: "Created new project", time: "2 hours ago" },
      { id: 2, action: "Completed task review", time: "4 hours ago" },
      { id: 3, action: "Updated profile settings", time: "1 day ago" }
    ]
  };
}

export function DashboardServerComponent({ data }: { data: any }) {
  return (
    <div className="border-b border-foreground/10 pb-4">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Welcome back, {data.user.name}!
      </h1>
      <p className="mt-2 text-foreground/60">
        Here's what's happening with your projects
      </p>
    </div>
  );
}