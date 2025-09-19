export interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
}

export interface BetterAuthSession {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface Session {
  user: User;
  session: BetterAuthSession;
}

export interface HomeServerData {
  title: string;
  description: string;
  tagline: string;
}

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedTasks: number;
}

export interface RecentActivity {
  id: number;
  action: string;
  time: string;
}

export interface DashboardServerData {
  user: DashboardUser;
  stats: DashboardStats;
  recentActivity: RecentActivity[];
}