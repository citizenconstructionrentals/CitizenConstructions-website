import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { scissorLiftsData } from "@/data/scissor-lifts";
import { boomLiftsData } from "@/data/boom-lifts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/scissor-lift-on-rent`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/boom-lift-on-rent`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/rental-rates`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/brand-new`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/used`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Scissor Lifts (if live)
  if (siteConfig.categoryStatus.brandNewScissor === "live") {
    routes.push({
      url: `${baseUrl}/brand-new/scissor-lifts`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    scissorLiftsData.forEach((model) => {
      routes.push({
        url: `${baseUrl}/brand-new/scissor-lifts/${model.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    });
  }

  // Boom Lifts (if live)
  if (siteConfig.categoryStatus.brandNewBoom === "live") {
    routes.push({
      url: `${baseUrl}/brand-new/boom-lifts`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    boomLiftsData.forEach((model) => {
      routes.push({
        url: `${baseUrl}/brand-new/boom-lifts/${model.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    });
  }

  // Used Scissor Lifts (if live)
  if (siteConfig.categoryStatus.usedScissor === "live") {
    routes.push({
      url: `${baseUrl}/used/scissor-lifts`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Used Boom Lifts (if live)
  if (siteConfig.categoryStatus.usedBoom === "live") {
    routes.push({
      url: `${baseUrl}/used/boom-lifts`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return routes;
}
