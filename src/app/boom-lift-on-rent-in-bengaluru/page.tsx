import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("bengaluru", "boom");

export default function Page() {
  return <CityLandingPage citySlug="bengaluru" liftType="boom" />;
}
