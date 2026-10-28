import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("bengaluru", "scissor");

export default function Page() {
  return <CityLandingPage citySlug="bengaluru" liftType="scissor" />;
}
