import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("mumbai", "scissor");

export default function Page() {
  return <CityLandingPage citySlug="mumbai" liftType="scissor" />;
}
