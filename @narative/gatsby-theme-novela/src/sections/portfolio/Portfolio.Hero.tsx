import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';
import Section from "@components/Section";

import mediaqueries from '@styles/media';
import { IArticle, IAuthor } from '@types';

interface ArticleHeroProps {
  article: IArticle;
  authors: IAuthor[];
}

const PortfolioHero: React.FC<ArticleHeroProps> = ({ article, authors }) => {
  const hasHeroImage =
    article.hero &&
    Object.keys(article.hero.full).length !== 0 &&
    article.hero.full.constructor === Object;

  return (
    <Hero>
      <HeroImage id="PortfolioImage__Hero">
      {hasHeroImage ? (
          <Image src={article.hero.full} alt={article.title} imgStyle={{ objectFit: 'cover', objectPosition: 'right bottom' }} />
      ) : (
          <ImagePlaceholder />
      )}
      </HeroImage>
      <Section>
        <Header dark={article.dark} backgroundColor={article.backgroundColor}>
          <EyeBrowHeading>{article.eyebrowHeadline}</EyeBrowHeading>
          <HeroHeading>{article.title}</HeroHeading>
          <HeroSubtitle>{article.excerpt}</HeroSubtitle>
        </Header>
      </Section>

      <OverlayCover dark={article.dark} backgroundColor={article.backgroundColor} />
      
    </Hero>
  );
};

export default PortfolioHero;

const Hero = styled.div`
    margin-top: -176px;
    position: relative;
    
    ${mediaqueries.tablet`
      margin-top: -104px;
      margin-bottom: 48px;
    `}
`;

const Header = styled.header<{
  dark: boolean;
  backgroundColor: string;
}>`
  position: absolute;
  top: 150px;
  z-index: 10;
  margin: 100px auto 56px;
  max-width: 510px;
  color: ${p => (!p.dark ? p.theme.colors.textTitle : p.theme.colors.card)};

  ${mediaqueries.desktop`
    max-width: 385px;
    margin: 100px auto 70px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
    margin: 64px auto 8px;
    bottom: 0;
    top: auto;
    text-align: center;
  `}
    
  ${mediaqueries.phablet`
    position: relative;
    margin-top: 28px;
  `}
`;

const HeroHeading = styled(Headings.h1)`
  // font-size: 48px;
  font-family: ${p => p.theme.fonts.title};
  color: inherit;
  margin-bottom: 25px;
  font-weight: ${p => p.theme.fontsWeight.bold};
  line-height: 1.32;
  opacity: .9;

  ${mediaqueries.tablet`
    margin-bottom: 20px;
    font-size: 36px;
  `}
`;

const EyeBrowHeading = styled(Headings.h4)`
  color: inherit;
  opacity: .7;
`;

const HeroSubtitle = styled.div`
  position: relative;
  font-size: 24px;
  color: inherit;
  align-items: center;
  opacity: .7;
`;

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  height: 840px;

    & > div {
      height: 100%;
    }


  ${mediaqueries.tablet`
    max-width: 100%;
    height: 70vh;

    & > div {
      height: 70vh;
    }
  `}

  ${mediaqueries.phablet`
    height: 300px;

    & > div {
      height: 300px;
    }
`}
`;

const OverlayCover = styled.div<{
    dark: boolean;
    backgroundColor: string;
  }>`
    position: absolute;
    top: 300px;
    width: 100%;
    height: 60%;
    transition: ${p => p.theme.colorModeTransition};
    z-index: 1;
    color: ${p => (!p.dark ? p.theme.colors.textTitle : p.theme.colors.card)};
    background-color: ${p => p.backgroundColor ? p.backgroundColor : 'none'};

    display: none; // hide on desktop

    ${mediaqueries.tablet`
      display: block;
    `}
`;
