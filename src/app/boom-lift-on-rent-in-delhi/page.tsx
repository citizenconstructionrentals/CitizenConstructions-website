import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("delhi", "boom");

export default function Page() {
  return <CityLandingPage citySlug="delhi" liftType="boom" />;
}
