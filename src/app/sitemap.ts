import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { scissorLiftsData } from "@/data/scissor-lifts";
import { boomLiftsData } from "@/data/boom-lifts";
import { CITIES } from "@/data/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Staggered realistic lastmod dates in late October 2026
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-10-28T09:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/scissor-lift-on-rent`,
      lastModified: new Date("2026-10-28T08:15:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/boom-lift-on-rent`,
      lastModified: new Date("2026-10-28T08:15:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/rental-rates`,
      lastModified: new Date("2026-10-27T14:20:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-10-26T11:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-10-27T16:45:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/brand-new`,
      lastModified: new Date("2026-10-25T12:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/used`,
      lastModified: new Date("2026-10-25T12:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Scissor Lifts (if live)
  if (siteConfig.categoryStatus.brandNewScissor === "live") {
    routes.push({
      url: `${baseUrl}/brand-new/scissor-lifts`,
      lastModified: new Date("2026-10-26T09:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    scissorLiftsData.forEach((model, idx) => {
      routes.push({
        url: `${baseUrl}/brand-new/scissor-lifts/${model.slug}`,
        lastModified: new Date(Date.UTC(2026, 9, 22 + (idx % 5), 8 + idx, 10 * idx)),
        changeFrequency: "weekly",
        priority: 0.85,
      });
    });
  }

  // Boom Lifts (if live)
  if (siteConfig.categoryStatus.brandNewBoom === "live") {
    routes.push({
      url: `${baseUrl}/brand-new/boom-lifts`,
      lastModified: new Date("2026-10-26T09:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    boomLiftsData.forEach((model, idx) => {
      routes.push({
        url: `${baseUrl}/brand-new/boom-lifts/${model.slug}`,
        lastModified: new Date(Date.UTC(2026, 9, 23 + idx, 9 + idx, 15 * idx)),
        changeFrequency: "weekly",
        priority: 0.85,
      });
    });
  }

  // Used Scissor Lifts (if live)
  if (siteConfig.categoryStatus.usedScissor === "live") {
    routes.push({
      url: `${baseUrl}/used/scissor-lifts`,
      lastModified: new Date("2026-10-24T15:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Used Boom Lifts (if live)
  if (siteConfig.categoryStatus.usedBoom === "live") {
    routes.push({
      url: `${baseUrl}/used/boom-lifts`,
      lastModified: new Date("2026-10-24T15:30:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // 22 City Landing Pages (11 Scissor + 11 Boom)
  CITIES.forEach((city, idx) => {
    // Scissor Lift in <City>
    routes.push({
      url: `${baseUrl}/scissor-lift-on-rent-in-${city.slug}`,
      lastModified: new Date(Date.UTC(2026, 9, 24 + (idx % 4), 7 + (idx % 8), 5 * idx)),
      changeFrequency: "weekly",
      priority: 0.85,
    });

    // Boom Lift in <City>
    routes.push({
      url: `${baseUrl}/boom-lift-on-rent-in-${city.slug}`,
      lastModified: new Date(Date.UTC(2026, 9, 24 + ((idx + 1) % 4), 8 + (idx % 8), 7 * idx)),
      changeFrequency: "weekly",
      priority: 0.85,
    });
  });

  return routes;
}
