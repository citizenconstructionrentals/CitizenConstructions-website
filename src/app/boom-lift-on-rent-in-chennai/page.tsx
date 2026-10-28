import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("chennai", "boom");

export default function Page() {
  return <CityLandingPage citySlug="chennai" liftType="boom" />;
}
