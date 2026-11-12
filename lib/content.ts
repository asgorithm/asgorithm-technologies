export type Fact = { value: string; label: string };

export type Project = {
  name: string;
  tag: string;
  status: { label: string; href?: string; live?: boolean };
  lede: string;
  copy: string;
  facts: Fact[];
  visual: "pitch" | "compass";
};

export const projects: Project[] = [
  {
    name: "NEET Compass",
    tag: "EdTech · Data",
    status: { label: "neetcompass.in ↗", href: "https://neetcompass.in" },
    lede: "A college predictor that turns a NEET rank into a clear, honest shortlist of where a student can get in.",
    copy: "We parsed years of official MCC allotment PDFs into a clean dataset, then built an engine that ranks every college as safe, target, reach or unlikely from real closing ranks, not guesswork. Sign-in is a WhatsApp OTP, and the platform runs on Kubernetes.",
    facts: [
      { value: "91,742", label: "Historical allotments parsed" },
      { value: "563", label: "Colleges normalised" },
      { value: "3 yrs", label: "Of category-wise closing ranks" },
    ],
    visual: "compass",
  },
  {
    name: "Qrida",
    tag: "Sports · Marketplace",
    status: { label: "In build", live: true },
    lede: "Competitive 5-a-side football for college players: a network for clubs and a way to turn talent into earnings.",
    copy: "Clubs form, govern themselves through live votes, and register for paid 1v1 Face-offs at Qrida-run venues. Prize pools settle automatically to every player in the lineup, down to the last rupee.",
    facts: [
      { value: "Go", label: "Clean Architecture API with a pure settlement engine" },
      { value: "9", label: "Indian languages from day one" },
      { value: "OTP", label: "Phone-first sign-in, built for mobile" },
    ],
    visual: "pitch",
  },
];

export type Capability = { name: string; desc: string; href: string };

export const capabilities: Capability[] = [
  {
    name: "AI Systems",
    desc: "Agents, copilots, retrieval and memory, and LLM workflows that do real work in production.",
    href: "/ai-systems.html",
  },
  {
    name: "Blockchain Systems",
    desc: "Private chains, smart contracts, wallets and tokenised infrastructure, built for real operations.",
    href: "/blockchain-systems.html",
  },
  {
    name: "Advanced Systems",
    desc: "Go and Rust backends, realtime platforms, payments, billing and observability, built for scale.",
    href: "/advanced-systems.html",
  },
  {
    name: "Content Systems",
    desc: "Programmable publishing, AI-assisted media pipelines and technical storytelling for founders.",
    href: "/content-systems.html",
  },
];

export type Step = { n: string; title: string; body: string };

export const steps: Step[] = [
  { n: "I", title: "Frame", body: "We find the decision the system exists to make, then define the domain before writing code." },
  { n: "II", title: "Architect", body: "Clean boundaries and pure business rules keep it testable, so it can change as fast as you do." },
  { n: "III", title: "Build", body: "We work in small, shippable increments and put a working product in your hands early." },
  { n: "IV", title: "Operate", body: "Observability, security and infrastructure are part of the build. We stay until it runs itself." },
];

export type Person = { name: string; role: string; bio: string; image: string };

export const team: Person[] = [
  {
    name: "Sudharsanan Kirubanandhan",
    role: "Co-founder",
    bio: "7+ years across startups and MNCs in blockchain, AI systems, backend engineering and technical storytelling.",
    image: "/public/sk.png",
  },
  {
    name: "Aayushman Narayan",
    role: "Co-founder",
    bio: "Ex-Arbitrum Foundation. Works on ecosystem growth, emerging technologies, deep systems thinking and community building.",
    image: "/public/Aayushman.png",
  },
];

export const contact = {
  email: "hello@asgorithm.com",
  address: ["Textool, Subramaniam Nagar, Ganapathy", "Coimbatore 641006, Tamil Nadu"],
  linkedin: "https://www.linkedin.com/company/asgorithm-technologies",
  github: "https://github.com/asgorithm",
};
