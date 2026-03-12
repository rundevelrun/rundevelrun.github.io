import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const TagListWrapper = styled.div`
  margin-bottom: 16px;
  word-break: break-all;
`

const TagLink = styled.div`
  display: inline-block;
  padding: 5px 12px;
  margin-right: 6px;
  margin-bottom: 6px;
  border-radius: 6px;
  border: 1px solid ${props =>
    props.selected
      ? "transparent"
      : props.theme.colors.border};
  background-color: ${props =>
    props.selected
      ? props.theme.colors.selectedTagBackground
      : props.theme.colors.tagBackground};
  color: ${props =>
    props.selected
      ? props.theme.colors.selectedTagText
      : props.theme.colors.tagText};
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s;

  &:hover {
    background-color: ${props =>
      props.selected
        ? props.theme.colors.hoveredSelectedTagBackground
        : props.theme.colors.hoveredTagBackground};
    border-color: ${props =>
      props.selected
        ? "transparent"
        : props.theme.colors.activatedBorder};
  }
`

const spaceToDash = text => {
  return text
  // return text.replace(/\s+/g, "-")
}

const TagList = ({ tagList, count, selected }) => {
  if (!tagList) return null

  if (!count) {
    return (
      <TagListWrapper>
        {tagList.map((tag, i) => (
          <Link key={JSON.stringify({ tag, i })} to={`/tags?q=${tag}`}>
            <TagLink>{spaceToDash(tag)}</TagLink>
          </Link>
        ))}
      </TagListWrapper>
    )
  }

  return (
    <TagListWrapper>
      {tagList.map((tag, i) => (
        <Link
          key={JSON.stringify({ tag, i })}
          to={
            selected === tag.fieldValue ? "/tags" : `/tags?q=${tag.fieldValue}`
          }
        >
          <TagLink selected={tag.fieldValue === selected}>
            {spaceToDash(tag.fieldValue)} ({tag.totalCount})
          </TagLink>
        </Link>
      ))}
    </TagListWrapper>
  )
}

export default TagList
