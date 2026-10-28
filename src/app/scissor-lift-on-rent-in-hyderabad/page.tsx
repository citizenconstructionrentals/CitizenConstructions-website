import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("hyderabad", "scissor");

export default function Page() {
  return <CityLandingPage citySlug="hyderabad" liftType="scissor" />;
}
