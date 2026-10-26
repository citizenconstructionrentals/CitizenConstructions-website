export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  location?: string;
  date?: string;
}

// Ships empty - Never write fake reviews.
// When genuine client reviews are provided, add them here to display the Testimonials section.
export const testimonials: Testimonial[] = [];
