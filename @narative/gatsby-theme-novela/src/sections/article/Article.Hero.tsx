import React from 'react';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from "gatsby";

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle, IAuthor } from '@types';

import ArticleAuthors from './Article.Authors';

const siteQuery = graphql`
{
  file(relativePath: {eq: "audio-recodrding-project.png"}) {
    id
    childImageSharp {
      fluid {
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
          <AudioWrapper>
            <AudioThumbnail>
              <Image src={avatarResult.file.childImageSharp.fluid} />
            </AudioThumbnail>
            <AudioBar>
              <AudioTitle>Voice, louder! project</AudioTitle>
              <audio controls src={article.audio}></audio>
            </AudioBar>
          </AudioWrapper>
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
        margin-bottom: 40px;
      `
    }
  `}

  ${mediaqueries.desktop`
    padding-left: 53px;
    max-width: calc(507px + 53px);
    margin: 100px auto 70px;
  `}

  ${mediaqueries.tablet`
    padding-left: 0;
    margin: 100px auto 70px;
    max-width: 480px;
  `}

  ${p => mediaqueries.phablet`
    margin: 64px auto 64px;
    padding: 0 40px;

    ${!p.hasHeroImage &&
      `
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
    margin-bottom: 20px;
  `}
`;

const Excerpt = styled(Headings.h3)`
  font-size: 28px;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};
  margin-bottom: 24px;
  margin-top: 24px;
  font-weight: normal;
  line-height: 1.5;
  text-align: center;

  ${mediaqueries.phablet`
    font-size: 22px;
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

const AudioWrapper = styled.div`
  display: grid;
  grid-gap: 24px;
  position: relative;
  grid-template-columns: 160px 1fr;
  margin: 40px auto 0 auto;
  align-items: center;
  box-shadow: ${p => p.theme.colors.neumorphismShadown};
  padding-right: 24px;
  max-width: 680px;

  ${mediaqueries.tablet`
    grid-template-columns: 120px 1fr;
  `}

`;

const AudioThumbnail = styled.div`

`;

const AudioBar  = styled.div`
  audio {
    width: 100%;
  }
`;

const AudioTitle = styled.p`
  margin-bottom: 8px;
  color: ${p => p.theme.colors.secondary};
`;

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  // max-width: 944px;
  max-width: 100%;
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
