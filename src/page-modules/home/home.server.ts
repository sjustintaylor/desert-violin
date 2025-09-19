export async function getHomeData() {
  return {
    title: "Desert Violin",
    description: "Welcome to your application",
    tagline: "The future of web development starts here"
  };
}

export function HomeServerComponent({ data }: { data: any }) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        {data.title}
      </h1>
      <p className="mt-6 text-lg leading-8 text-foreground/60">
        {data.tagline}
      </p>
    </div>
  );
}