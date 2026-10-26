import React from "react";
import { siteConfig } from "@/config/site";
import { FAQ_ITEMS } from "@/data/faq";
import { ScissorLiftModel } from "@/data/scissor-lifts";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        alternateName: siteConfig.alternateName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/logo.png`,
        image: `${siteConfig.url}/images/hero/hero-boom-lot.jpg`,
        email: siteConfig.email,
        telephone: [siteConfig.phones.primary.display, siteConfig.phones.secondary.display],
        foundingDate: siteConfig.foundingYear.toString(),
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        alternateName: siteConfig.alternateName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/logo.png`,
        image: `${siteConfig.url}/images/hero/hero-boom-lot.jpg`,
        email: siteConfig.email,
        telephone: [siteConfig.phones.primary.display, siteConfig.phones.secondary.display],
        priceRange: "₹₹₹",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, Credit Card, Bank Transfer",
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        parentOrganization: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: siteConfig.alternateName,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({ model }: { model: ScissorLiftModel }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteConfig.url}/brand-new/scissor-lifts/${model.slug}#product`,
    name: `${model.name} Scissor Lift on Rent`,
    image: `${siteConfig.url}${model.images[0]}`,
    description: `${model.name} Electric Self-Propelled Scissor Lift on rent across India. Working height ${model.workingHeight}, platform height ${model.platformHeight}, rated capacity ${model.safeWorkingLoad}. CE Certified.`,
    brand: {
      "@type": "Brand",
      name: model.brand,
    },
    mainEntityOfPage: `${siteConfig.url}/brand-new/scissor-lifts/${model.slug}`,
    offers: {
      "@type": "Offer",
      businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
      priceCurrency: "INR",
      price: "0",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      offeredBy: {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
