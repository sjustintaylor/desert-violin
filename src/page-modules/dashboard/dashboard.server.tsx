import { DashboardClient } from "./dashboard.client";

export async function getDashboardData() {
  return {
    user: {
      name: "User",
      email: "user@example.com",
    },
    stats: {
      totalProjects: 12,
      activeProjects: 3,
      completedTasks: 47,
    },
    recentActivity: [
      { id: 1, action: "Created new project", time: "2 hours ago" },
      { id: 2, action: "Completed task review", time: "4 hours ago" },
      { id: 3, action: "Updated profile settings", time: "1 day ago" },
    ],
  };
}

export async function DashboardServer() {
  const serverData = await getDashboardData();
  return <DashboardClient serverData={serverData} />;
}
