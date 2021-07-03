import React from "react";

import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { useColorMode } from "theme-ui";

import Anchor from "@components/Anchor";
import Blockquote from "@components/Blockquote";
import Code from "@components/Code";
import Figcaption from "@components/Figcaption"
import Headings from "@components/Headings";
import HorizontalRule from "@components/HorizontalRule";
import Lists from "@components/Lists";
import Paragraph from "@components/Paragraph";
import Tables from "@components/Tables";
import { ImageZoom } from "@components/Image";
// import Grid from "@components/Grid";

import mediaqueries from "@styles/media";
import { toKebabCase } from "@utils";

const videoPlaceholder = '/video-placeholder.svg';

const components = {
  img: ImageZoom,
  a: Anchor,
  blockquote: Blockquote,
  figcaption: Figcaption,
  h1: Headings.h2, // h1 reserved article title
  h2: Headings.h2,
  h3: Headings.h3,
  h4: Headings.h4,
  h5: Headings.h5,
  h6: Headings.h6,
  hr: HorizontalRule,
  ul: Lists.ul,
  ol: Lists.ol,
  p: Paragraph,
  code: Code.Prism,
  pre: Code.Pre,
  table: Tables.Table,
  thead: Tables.Head,
  th: Tables.HeadCell,
  td: Tables.Cell,
};

interface MDXProps {
  content: React.ReactNode;
}

const MDX: React.FC<MDXProps> = ({ content, children, ...props }) => {
  const [colorMode] = useColorMode();

  return (
    <MDXProvider components={components}>
      <MDXBody>
        <MDXRenderer isDark={colorMode === "dark"} {...props}>
          {content}
        </MDXRenderer>
        {children}
      </MDXBody>
    </MDXProvider>
  );
};

export default MDX;

const IMAGE_WIDTHS = {
  regular: "680px",
  large: "900px",
  full: "100%"
};

const ARTICLE_WIDTH = css`
  width: 100%;
  max-width: 680px;

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
  `};

  ${mediaqueries.phablet`
    padding: 0 20px;
  `};
`;

const HeadingsCSS = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 auto;
  }

  h1,
  h1 *,
  h2,
  h2 * {
    margin: 25px auto 18px;

    ${mediaqueries.tablet`
      margin: 30px auto 18px;
    `};
  }

  h3,
  h3 * {
    margin: 20px auto 10px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${ARTICLE_WIDTH};
  }

  h6 {
    margin-top: 64px;
    margin-bottom: -24px;
  }
`;

const PrismCSS = p => css`
  .prism-code {
    overflow: auto;
    width: 100%;
    max-width: 744px;
    margin: 0 auto;
    padding: 32px;
    font-size: 13px;
    margin: 15px auto 50px;
    border-radius: 5px;
    font-family: ${p.theme.fonts.monospace};
    background: ${p.theme.colors.prism.background};

    .token-line {
      border-left: 3px solid transparent;

      ${Object.keys(p.theme.colors.prism)
        .map(key => {
          return `.${toKebabCase(key)}{color:${p.theme.colors.prism[key]};}`;
        })
        .reduce((curr, next) => curr + next, ``)};

      & > span {
      }
    }

    .number-line {
      display: inline-block;
      width: 32px;
      user-select: none;
      opacity: 0.3;
      color: #dcd9e6;

      ${mediaqueries.tablet`
        opacity: 0;
        width: 0;
      `};
    }

    .token-line.highlight-line {
      margin: 0 -32px;
      padding: 0 32px;
      background: ${p.theme.colors.prism.highlight};
      border-left: 3px solid ${p.theme.colors.prism.highlightBorder};

      ${mediaqueries.tablet`
        margin: 0 -20px;
        padding: 0 20px;
      `};
    }

    .operator + .maybe-class-name {
      color: #ffcf74 !important;
    }

    .plain ~ .operator {
      color: #5fa8aa !important;
    }

    ${mediaqueries.desktop`
      left: -26px;
    `};

    ${mediaqueries.tablet`
      max-width: 526px;
      padding: 20px 20px;
      left: 0;
    `};

    ${mediaqueries.phablet`
      text-size-adjust: none;
      border-radius: 0;
      margin: 0 auto 25px;
      padding: 25px 20px;
      overflow: initial;
      width: unset;
      max-width: unset;
      float: left;
      min-width: 100%;
      overflow: initial;
      position: relative;
    `};
  }
`;

const iFrame = css`
  iframe {
    ${ARTICLE_WIDTH};
    margin-left: auto;
    margin-right: auto;
    
    &.instagram {
      margin-bottom: 32px;
      height: 734px;

      ${mediaqueries.desktop`
        height: 560px;
      `};
  
      ${mediaqueries.tablet`
        height: 538px;
      `};
  
      ${mediaqueries.phone`
        height: 428px;
        padding: 0;
      `};
    }

  }
`;

const LongQuote = p => css`
  .longquote {
    ${ARTICLE_WIDTH};
    padding: 32px 64px 24px;
    margin-left: auto;
    margin-right: auto;
    background-color: ${p.theme.colors.primary};
    box-shadow: inset 0px 6px 0px ${p.theme.colors.accent};
    margin-bottom: 32px;
    border-radius: 0 0 160px 0;

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${p.theme.colors.card};
    }

    ${mediaqueries.tablet`
      
    `};
  }

  .section {
    position: relative;
    padding-top: 56px;
    padding-bottom: 40px;
    margin-bottom: 96px;

    &.full {
      width: ${IMAGE_WIDTHS.full};
    }

    &.medium {
      margin: 0 auto;
      width: 100%;
      max-width: ${IMAGE_WIDTHS.large};
    }

    &.bg-dark {
      background-color: ${p.theme.colors.primary};

      p,
      figcaption,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,    
      ul, 
      ol  {
        color: ${p.theme.colors.card};
      }

      figcaption {
        opacity: .6;
      }
    }

    &.bg-light {
      background-color: ${p.theme.colors.card};
    }
  }

  .sticky {
    position: sticky;
    top: 24px;
  }

`;

const VideoCSS = css`
  .video {
    ${ARTICLE_WIDTH};
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 48px;
    margin-top: 32px;
  }
  
  video {
    display: inline-block;
    position: relative;
    max-width: 100%;
    height: auto;
    z-index: 0;
    background-image: url("${videoPlaceholder}");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    &.Round {
      border-radius: 40px;
      border: 5px solid #2C2C2D;
    }
  }
`;

const ImageCSS = css`
  .gatsby-resp-image-background-image {
    display: none !important;
  }

  img {
    display: inline-block;
    position: relative;
    max-width: 100%;
    height: auto;
    z-index: 0;
    margin: 15px auto 50px;

    ${mediaqueries.tablet`
      margin: 10px auto 45px;
    `};
  }

  div.Grid_Space {
    margin-top: 0 !important;
    margin-bottom: 8px !important;
  }

  div.Image__Small {
    // display: inline-block;
    position: relative;
    max-width: 100%;
    height: auto;
    z-index: 0;
    margin: 15px auto 50px;
    width: 100%;
    max-width: 680px;

    ${mediaqueries.tablet`
      margin: 10px auto 45px;
    `};

    ${mediaqueries.desktop`
      max-width: 507px;
    `}

    ${mediaqueries.tablet`
      max-width: 486px;
      margin: 0 auto 25px;
    `};

    ${mediaqueries.phablet`
      padding: 0 20px;
    `};
  }

  .Image__Container {
    text-align: center;
  }

  img.Image__With-Shadow {
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.15);
  }

  div.Image__Medium {
    position: relative;
    margin: 15px auto 50px;
    width: 100%;
    max-width: ${IMAGE_WIDTHS.large};

    ${mediaqueries.tablet`
      border-radius: 0;
      left: 0;
      margin: 0 auto 25px;

      img {
        border-radius: 0;
      }
    `};
  }

  div.Image__Large {
    position: relative;
    width: ${IMAGE_WIDTHS.full};
    margin: 25px auto 60px;
    pointer-events: none;

    & span {
      max-width: 100% !important;
    }

    img {
      border-radius: 0;
    }

    ${mediaqueries.tablet`
      left: 0;
      margin: 0 auto 25px;
    `};
  }
`;

const Grid = css`
  .Grid {
    display: grid;
    grid-gap: 8px;
    position: relative;
    margin-bottom: 8px;
    margin-left: auto;
    margin-right: auto;
    
    &.Margin_Small {
      margin-bottom: 48px;
    }
    
    &.Col2 {
      grid-template-columns: 1fr 1fr;
      margin-bottom: 64px;
      
      ${mediaqueries.tablet`
        grid-template-columns: 1fr;
      `};
    }

    &.Col2-ShortLeft {
      grid-template-columns: 300px 1fr;
      column-gap: 30px;
      margin-bottom: 64px;

      ${mediaqueries.tablet`
        grid-template-columns: 1fr;
      `};

      & > div:first-child {
        ${mediaqueries.desktop`
          padding-left: 32px;
        `};

        ${mediaqueries.tablet`
          padding-left: 0;
        `};
      }
      
    }
    
    &.Col3 {
      grid-template-columns: 1fr 1fr 1fr;
      
      ${mediaqueries.tablet`
        grid-template-columns: 1fr;
      `};
    }

    &.Space-Small {
      margin-bottom: 48px;
    }

    &.Space-Medium {
      margin-bottom: 96px;
    }

    &.Small {
      ${ARTICLE_WIDTH};

      ${mediaqueries.tablet`
          padding-left: 0;
          padding-right: 0;
      `};
    }
    
    &.Medium {
      max-width: ${IMAGE_WIDTHS.large};
    }
    
    &.Large {
      width: ${IMAGE_WIDTHS.full};
    }

    & .PaddingMobile {
      ${mediaqueries.tablet`
        padding-left: 20px;
        padding-right: 20px;
      `};
    }

    &.Grid-Gap-Medium {
      grid-gap: 64px;
      margin-bottom: 64px;
    }
  }

`;

/**
 * MDXBody
 * Here we're applying "global" selectors to make sure we maintain an article
 * body type feel. We're also applying all the Prism selecotors and styles within
 * the MDXBody.
 */
const MDXBody = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  flex-direction: column;

  ${HeadingsCSS}
  ${PrismCSS}
  ${ImageCSS}
  ${Grid}
  ${VideoCSS}
  ${iFrame}
  ${LongQuote}
`;
