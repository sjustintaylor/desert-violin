import { AuthClient } from "./auth.client";

export async function getAuthData() {
  return {};
}

export async function AuthServer() {
  const serverData = await getAuthData();

  return <AuthClient serverData={serverData} />;
}