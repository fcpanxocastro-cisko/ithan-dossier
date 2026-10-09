import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://www.flownewyork.cl', priority: 1 }, { url: 'https://www.flownewyork.cl/ithan', priority: 0.8 }];
}
