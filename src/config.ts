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

const isProduction = process.env.NODE_ENV !== "development";

const config: Config = {
  homeStorageKey: "/data",
  blogsStorageKey: "data/blogs",
  heroPicture: "/profile.jpg",
  isProduction,

  blogMeta: {
    title: "My Blog",
    description: "This is my blog. I write about something I like.",
  },
};

export default config;
