import data from "./services.json";

export type ServiceTheme = "orange" | "blue" | "purple" | "darkened";

export type ServiceProduct = {
  title: string;
  description: string;
  image: string;
  capabilities: string[];
};

export type Service = {
  slug: string;
  key: string;
  title: string;
  theme: ServiceTheme;
  summary: string;
  heroSubtext: string;
  overview: string;
  whatWeBuild: string[];
  products: ServiceProduct[];
};

export const services = data as Service[];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
