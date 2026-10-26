export interface TeamMember {
  name: string;
  role: string;
  image: string;
  alt: string;
  bio?: string;
  phone?: string;
}

export const DIRECTORS: TeamMember[] = [
  {
    name: "Jagmohan Singh",
    role: "Director",
    image: "/images/team/jagmohan-singh.jpg",
    alt: "Jagmohan Singh, Director of Citizen Construction Rentals",
  },
  {
    name: "Harpreet Singh",
    role: "Director",
    image: "/images/team/harpreet-singh.jpg",
    alt: "Harpreet Singh, Director of Citizen Construction Rentals",
  },
];
