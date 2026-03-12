import React from "react"
import styled from "styled-components"

import { copyright } from "../../../../blog-config"

const FooterWrapper = styled.footer`
  padding: 32px 15px;
  border-top: 1px solid ${props => props.theme.colors.divider};
  text-align: center;
  font-size: 13px;
  max-width: 680px;
  margin: 0 auto;
  color: ${props => props.theme.colors.mutedText};

  & > div#themeby > a#link {
    color: ${props => props.theme.colors.tertiaryText};
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${props => props.theme.colors.text};
    }
  }
`


const Footer = () => {
  return (
    <FooterWrapper>
        <div id={"themeby"}>
          Theme by{" "}
          <a id={"link"} href="https://github.com/rundevelrun/gatsby-starter-rundevelrun" target="blank">RUN:DEVEL:RUN</a>
          {" "}Built with Gatsby
        </div>
       {/* <div id={"copyright"} dangerouslySetInnerHTML={{ __html: copyright }}></div>*/}
    </FooterWrapper>
  )
}

export default Footer
