const config = {
  homeStorageKey: "/data",
  blogsStorageKey: "data/blogs",
  heroPicture: "/profile.jpg",
  isProduction: process.env.NODE_ENV === "production",
};

export default config;
