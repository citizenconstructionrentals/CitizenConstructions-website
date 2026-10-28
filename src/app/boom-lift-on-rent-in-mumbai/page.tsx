import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("mumbai", "boom");

export default function Page() {
  return <CityLandingPage citySlug="mumbai" liftType="boom" />;
}
