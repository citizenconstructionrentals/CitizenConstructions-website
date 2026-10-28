import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("chennai", "scissor");

export default function Page() {
  return <CityLandingPage citySlug="chennai" liftType="scissor" />;
}
