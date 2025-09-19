import { HomeClient } from "./home.client";

export async function getHomeData() {
  return {
    title: "Desert Violin",
    description: "Welcome to your application",
    tagline: "The future of web development starts here",
  };
}

export async function HomeServer() {
  const serverData = await getHomeData();
  return <HomeClient serverData={serverData} />;
}
