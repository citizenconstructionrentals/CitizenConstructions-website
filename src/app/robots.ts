import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const isPreview =
    process.env.NEXT_PUBLIC_ENV === "preview" || process.env.NEXT_PUBLIC_ENV === "staging";

  if (isPreview) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  // Internal private paths
  const disallowedPaths: string[] = ["/private/"];
  if (siteConfig.categoryStatus.brandNewScissor === "coming-soon") {
    disallowedPaths.push("/brand-new/scissor-lifts");
    disallowedPaths.push("/brand-new/scissor-lifts/*");
  }
  if (siteConfig.categoryStatus.brandNewBoom === "coming-soon") {
    disallowedPaths.push("/brand-new/boom-lifts");
    disallowedPaths.push("/brand-new/boom-lifts/*");
  }
  if (siteConfig.categoryStatus.usedScissor === "coming-soon") {
    disallowedPaths.push("/used/scissor-lifts");
  }
  if (siteConfig.categoryStatus.usedBoom === "coming-soon") {
    disallowedPaths.push("/used/boom-lifts");
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: disallowedPaths,
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
