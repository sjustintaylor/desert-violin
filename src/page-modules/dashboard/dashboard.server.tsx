import { DashboardClient } from "./dashboard.client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { User, DashboardServerData } from '@/types/auth';

export async function getDashboardData(user: User): Promise<DashboardServerData> {
  return {
    user: {
      name: user.name || "User",
      email: user.email,
      id: user.id,
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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  const serverData = await getDashboardData(session.user);
  return <DashboardClient serverData={serverData} session={session} />;
}
