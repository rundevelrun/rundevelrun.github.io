import React, { useState, useEffect } from "react"
import styled from "styled-components"
import _ from "lodash"

import { Link } from "gatsby"

import Title from "components/Title"
import TagList from "components/TagList"
import DisplayAds from "../DisplayAd"

const PostListWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`

const PostCard = styled.div`
  position: relative;
  padding: 20px 24px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  margin-bottom: 12px;
  transition: border-color 0.15s;

  &:hover {
    border-color: ${props => props.theme.colors.cardHoverBorder};
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

const Date = styled.span`
  font-size: 13px;
  color: ${props => props.theme.colors.tertiaryText};
`

const SeriesName = styled(Link)`
  font-size: 13px;
  color: ${props => props.theme.colors.tertiaryText};
  text-decoration: none;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  padding: 2px 8px;
  transition: border-color 0.15s, color 0.15s;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;

  &:hover {
    border-color: ${props => props.theme.colors.activatedBorder};
    color: ${props => props.theme.colors.activatedBorder};
  }
`

const Excerpt = styled.p`
  margin: 8px 0 14px 0;
  line-height: 1.6;
  font-size: 14px;
  color: ${props => props.theme.colors.tertiaryText};
  word-break: break-all;
`

const EmojiWrapper = styled.span`
  margin-right: 8px;
`

const checkIsScrollAtBottom = () => {
  return (
    document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
    document.documentElement.clientHeight + 100
  )
}

const PostList = ({ postList }) => {
  const [postCount, setPostCount] = useState(10)

  const handleMoreLoad = _.throttle(() => {
    if (checkIsScrollAtBottom() && postCount < postList.length) {
      setTimeout(() => setPostCount(postCount + 10), 300)
    }
  }, 250)

  useEffect(() => {
    window.addEventListener("scroll", handleMoreLoad)

    return () => {
      window.removeEventListener("scroll", handleMoreLoad)
    }
  }, [postCount, postList])

  useEffect(() => {
    setPostCount(10)
  }, [postList])

  return (
    <PostListWrapper>
      {postList.slice(0, postCount).map((post, i) => {
        const { title, date, tags, emoji, series } = post.frontmatter
        const { excerpt } = post
        const { slug } = post.fields
        return (
          <React.Fragment key={JSON.stringify({ slug, date })}>
            <PostCard>
              <CardMeta>
                <Date>{date}</Date>
                {series && (
                  <SeriesName to={`/series/${_.replace(series, /\s/g, "-")}`}>
                    {series}
                  </SeriesName>
                )}
              </CardMeta>
              <Title size="bg">
                {emoji && <EmojiWrapper>{emoji}</EmojiWrapper>}
                <Link to={slug}>{title}</Link>
              </Title>
              <Excerpt>{excerpt}</Excerpt>
              <TagList tagList={tags} />
            </PostCard>
            {(i === 0 || i === 2) && <DisplayAds />}
          </React.Fragment>
        )
      })}
    </PostListWrapper>
  )
}

export default PostList
