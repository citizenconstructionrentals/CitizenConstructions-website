import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("noida", "boom");

export default function Page() {
  return <CityLandingPage citySlug="noida" liftType="boom" />;
}
