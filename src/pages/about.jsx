import React from "react"
import styled from "styled-components"
import SEO from "components/SEO"
import Layout from "components/Layout"
import VerticalSpace from "components/VerticalSpace"
import { siteUrl } from "../../blog-config"

const Wrapper = styled.div`
  padding: 0 15px;
  max-width: 680px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: ${props => props.theme.colors.text};
`

const Section = styled.section`
  margin-bottom: 32px;
`

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${props => props.theme.colors.text};
`

const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: ${props => props.theme.colors.secondaryText};
  margin-bottom: 12px;
`

const TagList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Tag = styled.li`
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
  background-color: ${props => props.theme.colors.hoveredItemBackground};
  color: ${props => props.theme.colors.secondaryText};
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
        <Title>About</Title>

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

        <Section>
          <SectionTitle>운영자</SectionTitle>
          <Paragraph>
            GitHub:{" "}
            <a
              href="https://github.com/rundevelrun"
              target="_blank"
              rel="noreferrer"
            >
              @rundevelrun
            </a>
          </Paragraph>
          <Paragraph>
            문의:{" "}
            <a href="mailto:niphyang@gmail.com">niphyang@gmail.com</a>
          </Paragraph>
        </Section>
      </Wrapper>
      <VerticalSpace size={40} />
    </Layout>
  )
}

export default AboutPage
