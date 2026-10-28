import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("ghaziabad", "boom");

export default function Page() {
  return <CityLandingPage citySlug="ghaziabad" liftType="boom" />;
}
