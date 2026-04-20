import React from "react"
import styled from "styled-components"
import SEO from "components/SEO"
import Layout from "components/Layout"
import VerticalSpace from "components/VerticalSpace"
import { FaGithub } from "react-icons/fa"
import { FaRegEnvelope } from "react-icons/fa6"
import { siteUrl } from "../../blog-config"

const Wrapper = styled.div`
  padding: 0 15px;
  max-width: 680px;
  margin: 0 auto;
`

const Section = styled.section`
  margin-bottom: 40px;
`

const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${props => props.theme.colors.mutedText};
  margin-bottom: 16px;
`

const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: ${props => props.theme.colors.secondaryText};
  margin-bottom: 10px;
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Tag = styled.span`
  padding: 5px 13px;
  border-radius: 4px;
  font-size: 13px;
  background-color: ${props => props.theme.colors.hoveredItemBackground};
  color: ${props => props.theme.colors.secondaryText};
`

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: ${props => props.theme.colors.tertiaryText};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.theme.colors.text};
  }

  & svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  & svg path {
    fill: currentColor;
  }
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.colors.divider};
  margin: 0 0 40px 0;
`

const AboutPage = () => {
  return (
    <Layout>
      <SEO
        title="About"
        description="RUN:DEVEL:RUN 블로그 소개"
        url={`${siteUrl}/about`}
      />
      <VerticalSpace size={40} />
      <Wrapper>
        <Section>
          <SectionTitle>블로그 소개</SectionTitle>
          <Paragraph>
            개발하면서 겪은 경험과 사이드 프로젝트를 기록하는 개인 블로그입니다.
          </Paragraph>
          <Paragraph>
            DevOps, 백엔드, 모바일 개발에서 실제로 마주친 문제와 해결 과정을 정리하고,
            Claude Code를 활용한 바이브코딩 경험도 함께 공유합니다.
          </Paragraph>
        </Section>

        <Divider />

        <Section>
          <SectionTitle>주로 다루는 주제</SectionTitle>
          <TagList>
            <Tag>DevOps</Tag>
            <Tag>Spring Boot</Tag>
            <Tag>Flutter</Tag>
            <Tag>React</Tag>
            <Tag>AWS</Tag>
            <Tag>Linux</Tag>
            <Tag>Vibe Coding</Tag>
            <Tag>Side Project</Tag>
          </TagList>
        </Section>

        <Divider />

        <Section>
          <SectionTitle>연락처</SectionTitle>
          <ContactList>
            <ContactItem
              href="https://github.com/rundevelrun"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
              @rundevelrun
            </ContactItem>
            <ContactItem href="mailto:rundevelrun@gmail.com">
              <FaRegEnvelope />
              rundevelrun@gmail.com
            </ContactItem>
          </ContactList>
        </Section>
      </Wrapper>
      <VerticalSpace size={40} />
    </Layout>
  )
}

export default AboutPage
