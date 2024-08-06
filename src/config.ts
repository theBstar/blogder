type Config = {
  homeStorageKey: string;
  blogsStorageKey: string;
  heroPicture: string;
  isProduction: boolean;
  blogMeta: {
    title: string;
    description: string;
  };
};

const config: Config = {
  homeStorageKey: "/data",
  blogsStorageKey: "data/blogs",
  heroPicture: "/profile.jpg",
  isProduction: process.env.NEXT_PUBLIC_ENVIRONMENT === "production",

  blogMeta: {
    title: "My Blog",
    description: "This is my blog. I write about something I like.",
  },
};

export default config;
