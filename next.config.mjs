export const images = {
    domains: ['res.cloudinary.com'],
};

export const nextConfig = {
    webpack: (config) => {
      // Ensure correct loaders are used
      return config;
    },
  };