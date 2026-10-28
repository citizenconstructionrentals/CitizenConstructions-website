import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("ghaziabad", "scissor");

export default function Page() {
  return <CityLandingPage citySlug="ghaziabad" liftType="scissor" />;
}
