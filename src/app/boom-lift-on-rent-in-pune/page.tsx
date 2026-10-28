import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("pune", "boom");

export default function Page() {
  return <CityLandingPage citySlug="pune" liftType="boom" />;
}
