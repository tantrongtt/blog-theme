import React from 'react';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from "gatsby";

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle, IAuthor } from '@types';

import ArticleAuthors from './Article.Authors';
import AudioBar from '../others/Audio.Bar'

const siteQuery = graphql`
{
  file(relativePath: {eq: "audio-recodrding-project.png"}) {
    id
    childImageSharp {
      fluid(maxWidth: 120, quality: 100, base64Width: 1) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`;

interface ArticleHeroProps {
  article: IArticle;
  authors: IAuthor[];
}

const ArticleHero: React.FC<ArticleHeroProps> = ({ article, authors }) => {
  const hasCoAUthors = authors.length > 1;
  const hasHeroImage =
    article.hero &&
    Object.keys(article.hero.full).length !== 0 &&
    article.hero.full.constructor === Object;
  const avatarResult = useStaticQuery(siteQuery);

  return (
    <Hero>
      <Header hasHeroImage={hasHeroImage}>
        <HeroHeading>{article.title}</HeroHeading>
        <Excerpt>{article.excerpt}</Excerpt>
        <HeroSubtitle hasCoAUthors={hasCoAUthors}>
          <ArticleAuthors authors={authors} />
          <ArticleMeta hasCoAUthors={hasCoAUthors}>
            {article.date}
            {/* {article.date} · {article.timeToRead} min read */}
          </ArticleMeta>
        </HeroSubtitle>

        { article.audio && 
          <AudioBar
            title="Voice, louder! project"
            audioURL={article.audio}
          />
        }
        
      </Header>


      <HeroImage id="ArticleImage__Hero">
        {hasHeroImage &&
          <Image src={article.hero.full} />
        }
      </HeroImage>
    </Hero>
  );
};

export default ArticleHero;

const Hero = styled.div`
  ${p => mediaqueries.phablet`
    &::before {
      content: "";
      width: 100%;
      height: 20px;
      background: ${p.theme.colors.primary};
      position: absolute;
      left: 0;
      top: 0;
      transition: ${p.theme.colorModeTransition};
    }

    &::after {
      content: "";
      width: 100%;
      height: 10px;
      background: ${p.theme.colors.background};
      position: absolute;
      left: 0;
      top: 10px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      transition: ${p.theme.colorModeTransition};
    }
  `}
`;

const ArticleMeta = styled.div<{ hasCoAUthors: boolean }>`
  margin-left: ${p => (p.hasCoAUthors ? '10px' : '0')};

  ${mediaqueries.phablet`
    margin-left: 0;
  `}
`;

const Header = styled.header<{ hasHeroImage: boolean }>`
  position: relative;
  z-index: 10;
  margin: 100px auto 56px;
  max-width: 749px;
  
  ${p => `
    ${!p.hasHeroImage &&
      `
        padding-bottom: 56px;
        margin-bottom: 0;
        border-bottom: solid 1px ${p.theme.colors.horizontalRule};
      `
    }
  `}

  ${mediaqueries.desktop`
    max-width: calc(507px + 53px);
    margin: 100px auto 70px;
  `}

  ${mediaqueries.tablet`
    max-width: 480px;
  `}

  ${p => mediaqueries.phablet`
    margin: 64px 20px 64px;
    // padding: 0 32px;

    ${!p.hasHeroImage &&
      `
        padding-bottom: 40px;
        margin-bottom: 0;
      `
    }
  `}

  @media screen and (max-height: 700px) {
    margin: 100px auto 48px;
  }
`;

const HeroHeading = styled(Headings.h1)`
  font-family: ${p => p.theme.fonts.title};
  margin-bottom: 25px;
  font-weight: ${p => p.theme.fontsWeight.bold};
  text-align: center;

  ${mediaqueries.tablet`
    margin-bottom: 8px;
  `}
`;

const Excerpt = styled(Headings.h3)`
  font-size: 28px;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};
  margin: 24px 0;
  font-weight: normal;
  line-height: 1.5;
  text-align: center;

  ${mediaqueries.phablet`
    font-size: 22px;
    margin: 8px 0;
  `}
`;

const HeroSubtitle = styled.div<{ hasCoAUthors: boolean }>`
  position: relative;
  display: flex;
  font-size: 14px;
  color: ${p => p.theme.colors.secondary};
  align-items: center;
  justify-content: center;
  
  ${p => mediaqueries.phablet`
    flex-direction: column;
    align-items: left;

    ${p.hasCoAUthors &&
      `
        &::before {
          content: '';
          position: absolute;
          left: -20px;
          right: -20px;
          top: -10px;
          bottom: -10px;
          border: 1px solid ${p.theme.colors.horizontalRule};
          opacity: 0.5;
          border-radius: 5px;
        }
    `}


    strong {
      display: block;
      font-weight: 500;
      margin-bottom: 5px;
    }
  `}
`;

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 944px;
  overflow: hidden;
  margin: 0 auto;

  ${mediaqueries.tablet`
    max-width: 100%;
  `}

  ${mediaqueries.phablet`
    margin: 0 auto;
    // width: calc(100vw - 40px);
    // height: 220px;

    & > div {
      height: 220px;
    }
`}
`;
