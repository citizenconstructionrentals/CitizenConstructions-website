import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("ahmedabad", "boom");

export default function Page() {
  return <CityLandingPage citySlug="ahmedabad" liftType="boom" />;
}
