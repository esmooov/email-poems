import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Email poems" },
    { name: "description", content: "I am a provocateur at heart." },
  ];
}

export default function Home() {
  return <div>HELLO WORLD</div>;
}
