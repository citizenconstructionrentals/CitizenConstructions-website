import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("hyderabad", "boom");

export default function Page() {
  return <CityLandingPage citySlug="hyderabad" liftType="boom" />;
}
