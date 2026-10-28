import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("gurgaon", "boom");

export default function Page() {
  return <CityLandingPage citySlug="gurgaon" liftType="boom" />;
}
