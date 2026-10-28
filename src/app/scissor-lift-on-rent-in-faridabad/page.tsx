import { CityLandingPage, generateCityMetadata } from "@/components/city/CityLandingPage";

export const metadata = generateCityMetadata("faridabad", "scissor");

export default function Page() {
  return <CityLandingPage citySlug="faridabad" liftType="scissor" />;
}
