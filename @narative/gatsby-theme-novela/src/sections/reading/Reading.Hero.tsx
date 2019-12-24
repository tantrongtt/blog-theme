import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle, IAuthor } from '@types';

interface ArticleHeroProps {
  article: IArticle;
}

const ReadingHero: React.FC<ArticleHeroProps> = ({ article }) => {
  const hasHeroImage =
    article.hero &&
    Object.keys(article.hero.full).length !== 0 &&
    article.hero.full.constructor === Object;

  return (
    <Hero>
      <Header>
        <HeroHeading>{article.title}</HeroHeading>
        <Excerpt>{article.excerpt}</Excerpt>
      </Header>
      <HeroImage id="ReadingImage__Hero">
        {hasHeroImage ? (
          <Image src={article.hero.full} />
        ) : (
          <ImagePlaceholder />
        )}
      </HeroImage>
    </Hero>
  );
};

export default ReadingHero;

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

const Header = styled.header`
  position: relative;
  z-index: 10;
  margin:100px auto 56px;
  padding-left: 68px;
  max-width: 749px;

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

  ${mediaqueries.phablet`
    margin: 64px auto 64px;
    padding: 0 40px;
  `}

  @media screen and (max-height: 700px) {
    margin: 100px auto 48px;
  }
`;

const HeroHeading = styled(Headings.h1)`
  font-size: 48px;
  font-family: ${p => p.theme.fonts.title};
  margin-bottom: 25px;
  font-weight: bold;
  line-height: 1.32;

  ${mediaqueries.tablet`
    margin-bottom: 20px;
    font-size: 36px;
  `}

  ${mediaqueries.phablet`
    font-size: 32px;
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

  ${mediaqueries.tablet`
  `}

  ${mediaqueries.phablet`
    font-size: 22px;
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
    width: calc(100vw - 40px);
    height: 220px;

    & > div {
      height: 220px;
    }
`}
`;