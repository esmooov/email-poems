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
  font-family: "lores-21-serif", serif;
  font-weight: bold;
  font-size: 22px;
  padding: 40px 0px;
  
  @media only screen and (max-width: 800px) {
    font-size: 18px;
  }
`

const Title = styled.h1`
  font-family: "lores-21-serif", serif;
  text-align: center;
  padding: 0;
  margin: 0 0 40px 0;
`

const Emails = styled.div``
const Email = styled.div`
  display: grid;
  grid-template-columns: [ordinal] 40px [date] 3fr [from] 4fr [size] 80px [title] 8fr;
  gap: 15px;
  padding: 5px 40px;

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
    grid-template-columns: [ordinal] 40px [date] 2fr [from] 5fr [size] 80px [title] 8fr;
    padding: 5px 20px;
  }
  
  @media only screen and (max-width: 800px) {
    grid-template-columns: [ordinal] 40px [date] 2fr [from] 1fr [size] 3px [title] 8fr;
  
  }

  @media only screen and (max-width: 500px) {
    grid-template-columns: [ordinal] 20px [date] 3fr [from] 1.5fr [size] 3px [title] 9fr;
  }
`
const LightText = styled.div`
  &&& {
    color: gray;
  }
`

const MediumHide = styled.span`
  @media only screen and (max-width: 1280px) {
    display: none;
  }
`

const SmallHide = styled.span`
  @media only screen and (max-width: 800px) {
    display: none;
  }
`

const SmallShow = styled.span`
  display: none;
  
  @media only screen and (max-width: 800px) {
    display: initial;
  }
`

const EmailBody = styled.div`
  padding: 10px 40px;
  white-space: pre-wrap;
  max-width: 1000px;
  @media only screen and (max-width: 800px) {
    padding: 10px;
  }  
`

const EmailTitle = styled.div`
  text-overflow: ellipsis;
`

type EmailType = {
  from: string;
  fromLong: string;
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
      Mailbox with 2 messages (saved, unread, archived)
    </Title>
    <Emails>
      {emails.map((email,i) => {
        return (
          <>
            <Email onClick={() => email === selectedEmail ? setSelectedEmail(null) : setSelectedEmail(email)}>
              <LightText>({i})</LightText>
              <LightText>{email.time}<MediumHide> {email.timeLong}</MediumHide></LightText>
              <div>{email.from}<SmallHide> {email.fromLong}</SmallHide></div>
              <LightText>
                <SmallHide>({email.text.length})</SmallHide>
                <SmallShow>|</SmallShow>
              </LightText>
              <EmailTitle>{email.title}</EmailTitle>
            </Email>
            {email === selectedEmail && (
              <EmailBody>
                <LightText>Subject: {email.title}</LightText>
                <LightText>From: {email.from} {email.fromLong}</LightText>
                <LightText>To: {email.to} {email.toLong}</LightText>
                <br/>
                {email.text}
                <br/>
              </EmailBody>
            )}
          </>
        )
      })}
    </Emails>
  </Body>;
}
