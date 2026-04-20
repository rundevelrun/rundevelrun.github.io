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

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <SEO
        title="Privacy Policy"
        description="RUN:DEVEL:RUN 개인정보처리방침"
        url={`${siteUrl}/privacy-policy`}
      />
      <VerticalSpace size={40} />
      <Wrapper>
        <Title>개인정보처리방침</Title>

        <Section>
          <SectionTitle>개요</SectionTitle>
          <Paragraph>
            본 블로그(rundevelrun.com)는 방문자의 개인정보를 중요하게 생각합니다.
            본 방침은 본 사이트에서 수집하는 정보와 그 활용 방법에 대해 설명합니다.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>수집하는 정보</SectionTitle>
          <Paragraph>
            본 블로그는 서버를 직접 운영하지 않으며(GitHub Pages 기반), 방문자의 개인정보를 직접 수집하거나 저장하지 않습니다.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>광고 (Google AdSense)</SectionTitle>
          <Paragraph>
            본 블로그는 Google AdSense를 통해 광고를 제공합니다. Google은 광고 제공을 위해 쿠키를 사용할 수 있으며,
            이를 통해 방문자의 관심사에 맞는 광고를 표시합니다.
          </Paragraph>
          <Paragraph>
            Google의 광고 쿠키 사용 방식에 대한 자세한 내용은{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noreferrer"
            >
              Google 광고 정책
            </a>
            에서 확인하실 수 있습니다.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>댓글 (Giscus)</SectionTitle>
          <Paragraph>
            본 블로그는 GitHub Discussions 기반의 Giscus를 댓글 시스템으로 사용합니다.
            댓글 작성 시 GitHub 계정이 필요하며, 관련 개인정보는 GitHub의 개인정보처리방침을 따릅니다.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>외부 링크</SectionTitle>
          <Paragraph>
            본 블로그는 외부 사이트로의 링크를 포함할 수 있습니다. 외부 사이트의 개인정보처리방침에 대해서는 책임지지 않습니다.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>문의</SectionTitle>
          <Paragraph>
            개인정보처리방침에 관한 문의는 아래 이메일로 연락주시기 바랍니다.
          </Paragraph>
          <Paragraph>
            <a href="mailto:niphyang@gmail.com">niphyang@gmail.com</a>
          </Paragraph>
        </Section>

        <Section>
          <Paragraph>최종 수정일: 2026년 4월 20일</Paragraph>
        </Section>
      </Wrapper>
      <VerticalSpace size={40} />
    </Layout>
  )
}

export default PrivacyPolicyPage
