import type { Route } from "./+types/home";
import styled from "styled-components";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Email poems" },
    { name: "description", content: "I am a provocateur at heart." },
  ];
}

const Body = styled.div`
  font-family: "dos", sans-serif;
  font-size: 22px;
`

export default function Home() {
  return <Body>You can use any of the following commands</Body>;
}
