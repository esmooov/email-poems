import type { Route } from "./+types/home";
import * as React from "react";
import styled from "styled-components";
import { parse } from 'yaml'

import bone from "../emails/bone.yml?raw";
import palisades from "../emails/palisades.yml?raw";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Email poems" },
    { name: "description", content: "I am a provocateur at heart." },
  ];
}

const Body = styled.div`
  font-family: "dos", sans-serif;
  font-size: 22px;
  padding: 40px 20px;
  
  @media only screen and (max-width: 900px) {
    font-size: 18px;
  }
`

const Title = styled.h1`
  font-family: "dos", sans-serif;
  text-align: center;
  padding: 0;
  margin: 0 0 40px 0;
`

const Emails = styled.div``
const Email = styled.div`
  display: grid;
  grid-template-columns: [ordinal] 40px [date] 4fr [from] 4fr [size] 80px [title] 8fr;
  gap: 15px;
  padding: 5px;

  &:hover {
    background: white;
    color: black;
    cursor: pointer;
  }

  div {
    text-wrap: nowrap;
    overflow-x: hidden;
  }

  @media only screen and (max-width: 1280px) {
    grid-template-columns: [ordinal] 40px [date] 2fr [from] 2fr [size] 0px [title] 8fr;
  }
`
const LightText = styled.div`
  &&& {
    color: gray;
  }
`

const SmallHide = styled.span`
  @media only screen and (max-width: 1280px) {
    display: none;
  }
`

const EmailBody = styled.div`
  padding: 10px 40px;
  white-space: pre-wrap;
  @media only screen and (max-width: 800px) {
    padding: 10px;
  }  
`

type EmailType = {
  from: string;
  to: string;
  toLong: string; 
  time: string; 
  timeLong: string; 
  title: string; 
  text: string;
}

const safeParse = (txt: any) => {
  const raw = parse(txt)
  raw.text = raw.text.replace(/[\u2018\u2019]/g, "'")
                     .replace(/[\u201C\u201D]/g, '"')
                     .replace(/[\u2013\u2014]/g, "-")
  return raw;
}

const emails = [
  safeParse(bone),
  safeParse(palisades) 
] as Array<EmailType>

export default function Home() {
  const [selectedEmail, setSelectedEmail] = React.useState<(typeof emails)[number] | null>(null)
  return <Body>
   <Title>
      Mailbox is `/user/josi-carder/root` with 2 messages (JosiSOFT 2.1)
    </Title>
    <Emails>
      {emails.map((email,i) => {
        return (
          <>
            <Email onClick={() => email === selectedEmail ? setSelectedEmail(null) : setSelectedEmail(email)}>
              <LightText>({i})</LightText>
              <LightText>{email.time}<SmallHide> {email.timeLong}</SmallHide></LightText>
              <div>{email.to}<SmallHide> {email.toLong}</SmallHide></div>
              <LightText><SmallHide>({email.text.length})</SmallHide></LightText>
              <div>{email.title}</div>
            </Email>
            {email === selectedEmail && (
              <EmailBody>
                <LightText>Title: {email.title}</LightText>
                <LightText>From: {email.from}</LightText>
                <LightText>To: {email.to} {email.toLong}</LightText>
                {email.text}
              </EmailBody>
            )}
          </>
        )
      })}
    </Emails>
  </Body>;
}
